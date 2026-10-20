"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { MainContent } from "@/components/spot/MainContent";
import { Sidebar } from "@/components/spot/Sidebar";
import { useSidebarCollapsed } from "@/components/spot/useSidebarCollapsed";
import type { WorkspaceTree } from "@/lib/spot/types";

interface AppShellProps {
  tree: WorkspaceTree;
  children: ReactNode;
}

// Estructura de la aplicación: sidebar a la izquierda, contenido a la derecha.
// Vive en el layout raíz, así que su estado (barra contraída, menú del
// celular) sobrevive a la navegación entre pantallas.
export function AppShell({ tree, children }: AppShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useSidebarCollapsed();

  // Menú lateral del celular. Se guarda en qué ruta se abrió y se considera
  // abierto solo mientras esa siga siendo la ruta actual: al navegar se cierra
  // solo, sin tener que sincronizar nada con la URL.
  const [drawerOpenedAt, setDrawerOpenedAt] = useState<string | null>(null);
  const drawerOpen = drawerOpenedAt === pathname;
  const closeDrawer = () => setDrawerOpenedAt(null);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpenedAt(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen]);

  return (
    <div className="spot" data-sidebar={collapsed ? "collapsed" : "expanded"} data-drawer={drawerOpen ? "open" : "closed"}>
      <Sidebar tree={tree} collapsed={collapsed} onToggleCollapsed={() => setCollapsed(!collapsed)} onCloseDrawer={closeDrawer} />
      {drawerOpen ? <div className="spot-backdrop" onClick={closeDrawer} aria-hidden="true" /> : null}
      <MainContent tree={tree} onOpenDrawer={() => setDrawerOpenedAt(pathname)}>
        {children}
      </MainContent>
    </div>
  );
}
