import { FolderItem } from "@/components/spot/FolderItem";
import { SpaceMarker } from "@/components/spot/SpaceMarker";
import { TreeRow } from "@/components/spot/TreeRow";
import type { TreeExpansion } from "@/components/spot/useTreeExpansion";
import { isSelected, spotRoutes } from "@/lib/spot/navigation";
import type { ResolvedSelection, SpaceNode } from "@/lib/spot/types";

interface SpaceItemProps {
  space: SpaceNode;
  resolved: ResolvedSelection | null;
  expansion: TreeExpansion;
  /** Con la barra contraída solo se ve el marcador: el nombre pasa a tooltip. */
  collapsed: boolean;
}

export function SpaceItem({ space, resolved, expansion, collapsed }: SpaceItemProps) {
  return (
    <TreeRow
      depth={0}
      href={spotRoutes.space(space.id)}
      label={space.name}
      title={collapsed ? space.name : undefined}
      icon={<SpaceMarker space={space} />}
      active={isSelected(resolved, "space", space.id)}
      expandable
      expanded={expansion.isExpanded(space.id)}
      onToggle={() => expansion.toggle(space.id)}
    >
      <ul className="spot-tree-group">
        {space.folders.map((folder) => (
          <FolderItem key={folder.id} folder={folder} resolved={resolved} expansion={expansion} />
        ))}
        {space.folders.length === 0 ? (
          <li className="spot-tree-empty" data-depth={1}>
            Sin carpetas
          </li>
        ) : null}
      </ul>
    </TreeRow>
  );
}
