import Link from "next/link";
import { SpotIcons } from "@/components/spot/Icons";
import { SpotLogo } from "@/components/spot/SpotLogo";
import { spotRoutes } from "@/lib/spot/navigation";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onCloseDrawer: () => void;
}

// Cabecera del sidebar: marca + botón para contraer (computadora) o cerrar
// (celular). Los dos botones existen siempre; el CSS muestra uno por tamaño.
export function SidebarHeader({ collapsed, onToggleCollapsed, onCloseDrawer }: SidebarHeaderProps) {
  return (
    <div className="spot-sidebar-head">
      <Link href={spotRoutes.home()} className="spot-brand" aria-label="SPOT OS, ir al inicio">
        <SpotLogo />
        <span className="spot-brand-name">
          SPOT <span>OS</span>
        </span>
      </Link>
      <button
        type="button"
        className="spot-icon-btn spot-collapse-btn"
        onClick={onToggleCollapsed}
        aria-expanded={!collapsed}
        aria-controls="spot-sidebar"
        aria-label={collapsed ? "Expandir barra lateral" : "Contraer barra lateral"}
        title={collapsed ? "Expandir" : "Contraer"}
      >
        <SpotIcons.panel />
      </button>
      <button type="button" className="spot-icon-btn spot-close-btn" onClick={onCloseDrawer} aria-label="Cerrar menú">
        <SpotIcons.close />
      </button>
    </div>
  );
}
