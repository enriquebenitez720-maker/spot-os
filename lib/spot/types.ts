// SPOT OS · tipos del dominio.
//
// Jerarquía: Workspace → Space (espacio) → Folder (carpeta) → List (lista).
// Las tareas y subtareas llegan en la etapa 2; cuando existan, cuelgan de List.
//
// Hay dos formas de los mismos datos:
// - Las entidades "planas" (Space, Folder, List) con el id del padre, que es
//   la forma en que van a venir de la base/API.
// - Los nodos del árbol (SpaceNode, FolderNode, ListNode), que anidan a sus
//   hijos y son los que consume la interfaz (sidebar, tarjetas, breadcrumb).
// El paso de una a otra lo hace lib/spot/workspace.ts.

export type SpotId = string;

export interface Workspace {
  id: SpotId;
  name: string;
}

export interface Space {
  id: SpotId;
  workspaceId: SpotId;
  name: string;
  /** Color de identificación (hex). Se usa en el marcador del sidebar y las tarjetas. */
  color: string;
  description?: string;
}

export interface Folder {
  id: SpotId;
  spaceId: SpotId;
  name: string;
  description?: string;
}

export interface List {
  id: SpotId;
  folderId: SpotId;
  name: string;
  description?: string;
}

export type ListNode = List;

export interface FolderNode extends Folder {
  lists: ListNode[];
}

export interface SpaceNode extends Space {
  folders: FolderNode[];
}

export interface WorkspaceTree extends Workspace {
  spaces: SpaceNode[];
}

/** Qué nivel de la jerarquía está seleccionado (lo que indica la URL). */
export type SelectionKind = "space" | "folder" | "list";

export interface Selection {
  kind: SelectionKind;
  id: SpotId;
}

/** Selección resuelta contra el árbol: siempre trae el espacio, y la carpeta y la lista si corresponde. */
export interface ResolvedSelection {
  kind: SelectionKind;
  space: SpaceNode;
  folder?: FolderNode;
  list?: ListNode;
}

export interface WorkspaceStats {
  spaces: number;
  folders: number;
  lists: number;
  /** Siempre 0 en la etapa 1: las tareas todavía no existen. */
  tasks: number;
}
