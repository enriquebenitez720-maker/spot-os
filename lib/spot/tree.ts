// SPOT OS · consultas puras sobre el árbol del workspace.

import type { FolderNode, ListNode, SpaceNode, WorkspaceTree } from "@/lib/spot/types";

export function countLists(space: SpaceNode): number {
  return space.folders.reduce((total, folder) => total + folder.lists.length, 0);
}

export interface ListEntry {
  list: ListNode;
  folder: FolderNode;
  space: SpaceNode;
}

/** Todas las listas del workspace con su carpeta y su espacio, en el orden del árbol. */
export function flattenLists(tree: WorkspaceTree): ListEntry[] {
  return tree.spaces.flatMap((space) =>
    space.folders.flatMap((folder) => folder.lists.map((list) => ({ list, folder, space }))),
  );
}
