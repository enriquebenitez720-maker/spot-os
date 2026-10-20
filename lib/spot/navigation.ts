// SPOT OS · rutas y helpers de navegación.
//
// Todo lo que traduce entre la URL y la jerarquía vive acá: cómo se arma el
// enlace a un espacio, qué selección representa una ruta, y cómo se obtienen
// el breadcrumb y el camino de ancestros. Son funciones puras: sirven tanto
// en el servidor (páginas) como en el cliente (sidebar y breadcrumb).

import type { ResolvedSelection, Selection, SelectionKind, WorkspaceTree } from "@/lib/spot/types";

// SPOT OS vive en la raíz del sitio. Si algún día cuelga de un prefijo
// (por ejemplo "/spot"), se cambia solo acá.
export const SPOT_BASE_PATH = "";

// Segmentos de URL en español, como el resto de la aplicación.
const SEGMENT_BY_KIND: Record<SelectionKind, string> = {
  space: "espacios",
  folder: "carpetas",
  list: "listas",
};

const KIND_BY_SEGMENT: Record<string, SelectionKind> = {
  espacios: "space",
  carpetas: "folder",
  listas: "list",
};

export const spotRoutes = {
  home: () => SPOT_BASE_PATH || "/",
  space: (id: string) => `${SPOT_BASE_PATH}/${SEGMENT_BY_KIND.space}/${encodeURIComponent(id)}`,
  folder: (id: string) => `${SPOT_BASE_PATH}/${SEGMENT_BY_KIND.folder}/${encodeURIComponent(id)}`,
  list: (id: string) => `${SPOT_BASE_PATH}/${SEGMENT_BY_KIND.list}/${encodeURIComponent(id)}`,
};

export function isSpotHome(pathname: string): boolean {
  return pathname === spotRoutes.home() || pathname === `${SPOT_BASE_PATH}/`;
}

/**
 * Lee la selección que representa una ruta de SPOT OS.
 * `/carpetas/marketing-clientes` → { kind: "folder", id: "marketing-clientes" }.
 * Devuelve `null` para el inicio o para rutas que no son de la jerarquía.
 */
export function parseSpotPathname(pathname: string): Selection | null {
  if (!pathname.startsWith(SPOT_BASE_PATH)) return null;
  const rest = pathname.slice(SPOT_BASE_PATH.length).split("/").filter(Boolean);
  if (rest.length !== 2) return null;
  const kind = KIND_BY_SEGMENT[rest[0]];
  if (!kind) return null;
  try {
    return { kind, id: decodeURIComponent(rest[1]) };
  } catch {
    return null;
  }
}

/** Busca la selección en el árbol y devuelve el nodo con sus ancestros. */
export function resolveSelection(tree: WorkspaceTree, selection: Selection): ResolvedSelection | null {
  for (const space of tree.spaces) {
    if (selection.kind === "space") {
      if (space.id === selection.id) return { kind: "space", space };
      continue;
    }
    for (const folder of space.folders) {
      if (selection.kind === "folder") {
        if (folder.id === selection.id) return { kind: "folder", space, folder };
        continue;
      }
      const list = folder.lists.find((candidate) => candidate.id === selection.id);
      if (list) return { kind: "list", space, folder, list };
    }
  }
  return null;
}

/** Ids desde el espacio hasta el nodo seleccionado (inclusive). Sirve para abrir el árbol. */
export function selectionPathIds(resolved: ResolvedSelection | null): string[] {
  if (!resolved) return [];
  const ids = [resolved.space.id];
  if (resolved.folder) ids.push(resolved.folder.id);
  if (resolved.list) ids.push(resolved.list.id);
  return ids;
}

export function isSelected(resolved: ResolvedSelection | null, kind: SelectionKind, id: string): boolean {
  if (!resolved || resolved.kind !== kind) return false;
  const node = kind === "space" ? resolved.space : kind === "folder" ? resolved.folder : resolved.list;
  return node?.id === id;
}

export interface Crumb {
  label: string;
  href: string;
  current: boolean;
}

/** Breadcrumb: SPOT OS / Marketing / Clientes / Cliente ABC. El último es la pantalla actual. */
export function buildBreadcrumb(tree: WorkspaceTree, resolved: ResolvedSelection | null): Crumb[] {
  const crumbs: Crumb[] = [{ label: tree.name, href: spotRoutes.home(), current: false }];
  if (!resolved) {
    crumbs.push({ label: "Inicio", href: spotRoutes.home(), current: true });
    return crumbs;
  }
  crumbs.push({ label: resolved.space.name, href: spotRoutes.space(resolved.space.id), current: false });
  if (resolved.folder) {
    crumbs.push({ label: resolved.folder.name, href: spotRoutes.folder(resolved.folder.id), current: false });
  }
  if (resolved.list) {
    crumbs.push({ label: resolved.list.name, href: spotRoutes.list(resolved.list.id), current: false });
  }
  crumbs[crumbs.length - 1].current = true;
  return crumbs;
}
