"use client";

import { SpaceItem } from "@/components/spot/SpaceItem";
import { useTreeExpansion } from "@/components/spot/useTreeExpansion";
import type { SpotLocation } from "@/components/spot/useSpotLocation";
import { selectionPathIds } from "@/lib/spot/navigation";
import type { WorkspaceTree } from "@/lib/spot/types";

interface WorkspaceNavigationProps {
  tree: WorkspaceTree;
  location: SpotLocation;
  collapsed: boolean;
}

// Sección "Espacios" del sidebar: el árbol Espacio → Carpeta → Lista.
export function WorkspaceNavigation({ tree, location, collapsed }: WorkspaceNavigationProps) {
  const expansion = useTreeExpansion(location.pathname, selectionPathIds(location.resolved));

  return (
    <div className="spot-section">
      <div className="spot-section-head">
        <span className="spot-section-title" id="spot-espacios">
          Espacios
        </span>
      </div>
      <ul className="spot-tree" aria-labelledby="spot-espacios">
        {tree.spaces.map((space) => (
          <SpaceItem key={space.id} space={space} resolved={location.resolved} expansion={expansion} collapsed={collapsed} />
        ))}
        {tree.spaces.length === 0 ? (
          <li className="spot-tree-empty" data-depth={0}>
            Todavía no hay espacios
          </li>
        ) : null}
      </ul>
    </div>
  );
}
