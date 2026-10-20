import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/spot/Breadcrumb";
import { SpotIcons } from "@/components/spot/Icons";
import type { WorkspaceTree } from "@/lib/spot/types";

interface MainContentProps {
  tree: WorkspaceTree;
  onOpenDrawer: () => void;
  children: ReactNode;
}

// Área principal: barra superior con el breadcrumb (y el botón de menú en el
// celular) y debajo el contenido de la pantalla actual.
export function MainContent({ tree, onOpenDrawer, children }: MainContentProps) {
  return (
    <div className="spot-main">
      <header className="spot-topbar">
        <button type="button" className="spot-icon-btn spot-menu-btn" onClick={onOpenDrawer} aria-label="Abrir menú" aria-controls="spot-sidebar">
          <SpotIcons.menu />
        </button>
        <Breadcrumb tree={tree} />
      </header>
      <main className="spot-content">{children}</main>
    </div>
  );
}
