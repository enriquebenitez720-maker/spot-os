import { SpotIcons } from "@/components/spot/Icons";
import { TreeRow } from "@/components/spot/TreeRow";
import { isSelected, spotRoutes } from "@/lib/spot/navigation";
import type { ListNode, ResolvedSelection } from "@/lib/spot/types";

export function ListItem({ list, resolved }: { list: ListNode; resolved: ResolvedSelection | null }) {
  return (
    <TreeRow
      depth={2}
      href={spotRoutes.list(list.id)}
      label={list.name}
      icon={<SpotIcons.list />}
      active={isSelected(resolved, "list", list.id)}
    />
  );
}
