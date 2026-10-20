"use client";

import { usePathname } from "next/navigation";
import { isSpotHome, parseSpotPathname, resolveSelection } from "@/lib/spot/navigation";
import type { ResolvedSelection, WorkspaceTree } from "@/lib/spot/types";

export interface SpotLocation {
  pathname: string;
  /** Espacio/carpeta/lista actual con sus ancestros, o `null` en el inicio. */
  resolved: ResolvedSelection | null;
  isHome: boolean;
}

// Dónde está el usuario dentro de la jerarquía, leído de la URL. Es la única
// fuente de verdad de la selección: el sidebar y el breadcrumb la derivan de
// acá, así los dos coinciden siempre y la navegación con atrás/adelante y los
// enlaces directos funcionan sin estado extra.
export function useSpotLocation(tree: WorkspaceTree): SpotLocation {
  const pathname = usePathname();
  const selection = parseSpotPathname(pathname);
  const resolved = selection ? resolveSelection(tree, selection) : null;
  return { pathname, resolved, isHome: isSpotHome(pathname) };
}
