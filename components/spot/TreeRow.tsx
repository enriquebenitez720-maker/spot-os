import Link from "next/link";
import type { ReactNode } from "react";
import { SpotIcons } from "@/components/spot/Icons";

export type TreeDepth = 0 | 1 | 2;

interface TreeRowProps {
  depth: TreeDepth;
  href: string;
  label: string;
  icon: ReactNode;
  active: boolean;
  /** Tooltip nativo; se usa cuando la barra está contraída y solo se ve el ícono. */
  title?: string;
  /** Si tiene hijos: muestra la flecha para abrir/cerrar y, abierto, renderiza `children`. */
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
}

// Fila del árbol del sidebar, común a espacios, carpetas y listas. Separa dos
// gestos: la flecha abre/cierra sin navegar; el nombre navega (y, por la regla
// de useTreeExpansion, abre el nodo porque pasa a ser la selección).
export function TreeRow({ depth, href, label, icon, active, title, expandable = false, expanded = false, onToggle, children }: TreeRowProps) {
  return (
    <li className="spot-tree-item">
      <div className={active ? "spot-row is-active" : "spot-row"} data-depth={depth}>
        {expandable ? (
          <button
            type="button"
            className="spot-row-toggle"
            aria-expanded={expanded}
            aria-label={`${expanded ? "Contraer" : "Expandir"} ${label}`}
            onClick={onToggle}
          >
            <SpotIcons.chevron />
          </button>
        ) : (
          <span className="spot-row-toggle spot-row-toggle--none" aria-hidden="true" />
        )}
        <Link href={href} className="spot-row-link" aria-current={active ? "page" : undefined} title={title}>
          <span className="spot-row-icon">{icon}</span>
          <span className="spot-row-label">{label}</span>
        </Link>
      </div>
      {expandable && expanded ? children : null}
    </li>
  );
}
