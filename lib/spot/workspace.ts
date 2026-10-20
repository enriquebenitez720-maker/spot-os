// SPOT OS · acceso a datos del workspace.
//
// Es el único lugar que sabe de dónde salen los datos. Hoy lee los mocks de
// lib/spot/mock-data.ts; cuando haya base de datos (Supabase) o API, se cambia
// acá adentro y el resto de la aplicación sigue igual. Por eso las funciones
// ya son asíncronas aunque todavía no esperen nada.
//
// Se puede llamar desde Server Components (layout y páginas). Dentro de un
// mismo pedido, `cache` hace que el árbol se arme una sola vez aunque lo pidan
// el layout (para el sidebar) y la página (para el contenido).

import { cache } from "react";
import { MOCK_FOLDERS, MOCK_LISTS, MOCK_SPACES, MOCK_WORKSPACE } from "@/lib/spot/mock-data";
import { resolveSelection } from "@/lib/spot/navigation";
import type {
  Folder,
  List,
  ResolvedSelection,
  Selection,
  Space,
  Workspace,
  WorkspaceStats,
  WorkspaceTree,
} from "@/lib/spot/types";

/** Arma el árbol anidado a partir de las entidades planas. */
export function buildWorkspaceTree(
  workspace: Workspace,
  spaces: Space[],
  folders: Folder[],
  lists: List[],
): WorkspaceTree {
  return {
    ...workspace,
    spaces: spaces.map((space) => ({
      ...space,
      folders: folders
        .filter((folder) => folder.spaceId === space.id)
        .map((folder) => ({
          ...folder,
          lists: lists.filter((list) => list.folderId === folder.id),
        })),
    })),
  };
}

/** El workspace completo con sus espacios, carpetas y listas. */
export const getWorkspaceTree = cache(async (): Promise<WorkspaceTree> => {
  return buildWorkspaceTree(MOCK_WORKSPACE, MOCK_SPACES, MOCK_FOLDERS, MOCK_LISTS);
});

/** El espacio/carpeta/lista que pide una URL, con sus ancestros. `null` si no existe. */
export async function getSelection(selection: Selection): Promise<ResolvedSelection | null> {
  const tree = await getWorkspaceTree();
  return resolveSelection(tree, selection);
}

/** Conteos para los indicadores de la pantalla de inicio. */
export function countWorkspace(tree: WorkspaceTree): WorkspaceStats {
  const folders = tree.spaces.flatMap((space) => space.folders);
  const lists = folders.flatMap((folder) => folder.lists);
  return {
    spaces: tree.spaces.length,
    folders: folders.length,
    lists: lists.length,
    // Etapa 2: cuando existan las tareas, se cuentan acá.
    tasks: 0,
  };
}
