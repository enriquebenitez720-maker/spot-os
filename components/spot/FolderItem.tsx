import { SpotIcons } from "@/components/spot/Icons";
import { ListItem } from "@/components/spot/ListItem";
import { TreeRow } from "@/components/spot/TreeRow";
import type { TreeExpansion } from "@/components/spot/useTreeExpansion";
import { isSelected, spotRoutes } from "@/lib/spot/navigation";
import type { FolderNode, ResolvedSelection } from "@/lib/spot/types";

interface FolderItemProps {
  folder: FolderNode;
  resolved: ResolvedSelection | null;
  expansion: TreeExpansion;
}

export function FolderItem({ folder, resolved, expansion }: FolderItemProps) {
  return (
    <TreeRow
      depth={1}
      href={spotRoutes.folder(folder.id)}
      label={folder.name}
      icon={<SpotIcons.folder />}
      active={isSelected(resolved, "folder", folder.id)}
      expandable
      expanded={expansion.isExpanded(folder.id)}
      onToggle={() => expansion.toggle(folder.id)}
    >
      <ul className="spot-tree-group">
        {folder.lists.map((list) => (
          <ListItem key={list.id} list={list} resolved={resolved} />
        ))}
        {folder.lists.length === 0 ? (
          <li className="spot-tree-empty" data-depth={2}>
            Sin listas
          </li>
        ) : null}
      </ul>
    </TreeRow>
  );
}
