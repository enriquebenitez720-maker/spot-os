"use client";

import Link from "next/link";
import { SpotIcons } from "@/components/spot/Icons";
import { SidebarHeader } from "@/components/spot/SidebarHeader";
import { WorkspaceNavigation } from "@/components/spot/WorkspaceNavigation";
import { useSpotLocation } from "@/components/spot/useSpotLocation";
import { spotRoutes } from "@/lib/spot/navigation";
import type { WorkspaceTree } from "@/lib/spot/types";

interface SidebarProps {
  tree: WorkspaceTree;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onCloseDrawer: () => void;
}

export function Sidebar({ tree, collapsed, onToggleCollapsed, onCloseDrawer }: SidebarProps) {
  const location = useSpotLocation(tree);

  return (
    <aside id="spot-sidebar" className="spot-sidebar" aria-label="Barra lateral">
      <SidebarHeader collapsed={collapsed} onToggleCollapsed={onToggleCollapsed} onCloseDrawer={onCloseDrawer} />
      <nav className="spot-nav" aria-label="Principal">
        <Link href={spotRoutes.home()} className="spot-nav-item" aria-current={location.isHome ? "page" : undefined} title="Inicio">
          <SpotIcons.home />
          <span className="spot-nav-label">Inicio</span>
        </Link>
      </nav>
      <WorkspaceNavigation tree={tree} location={location} collapsed={collapsed} />
    </aside>
  );
}
