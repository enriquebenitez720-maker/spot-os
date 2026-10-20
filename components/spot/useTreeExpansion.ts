"use client";

import { useState } from "react";

interface ExpansionState {
  /** Nodos que el usuario abrió a mano (fuera del camino de la selección). */
  opened: ReadonlySet<string>;
  /** Nodos del camino de la selección que el usuario cerró, con la ruta en la que lo hizo. */
  closedAt: ReadonlyMap<string, string>;
}

const INITIAL: ExpansionState = { opened: new Set(), closedAt: new Map() };

export interface TreeExpansion {
  isExpanded: (id: string) => boolean;
  toggle: (id: string) => void;
}

/**
 * Estado abierto/cerrado del árbol del sidebar.
 *
 * Regla: los nodos del camino hacia la selección actual (`pathIds`) están
 * abiertos por defecto, así lo seleccionado siempre queda a la vista; el resto
 * está cerrado. El usuario puede invertir cualquiera de los dos casos.
 *
 * Un cierre manual de un nodo del camino vale solo mientras la ruta siga siendo
 * la misma: al navegar a otro lugar dentro de ese nodo, se vuelve a abrir solo.
 * Guardar la ruta junto con el cierre permite derivar todo esto sin efectos ni
 * sincronizaciones con la URL.
 */
export function useTreeExpansion(pathname: string, pathIds: readonly string[]): TreeExpansion {
  const [state, setState] = useState<ExpansionState>(INITIAL);
  const onPath = new Set(pathIds);

  const expandedIn = (current: ExpansionState, id: string) =>
    current.opened.has(id) || (onPath.has(id) && current.closedAt.get(id) !== pathname);

  const toggle = (id: string) =>
    setState((current) => {
      const opened = new Set(current.opened);
      const closedAt = new Map(current.closedAt);
      if (expandedIn(current, id)) {
        opened.delete(id);
        if (onPath.has(id)) closedAt.set(id, pathname);
      } else {
        closedAt.delete(id);
        if (!onPath.has(id)) opened.add(id);
      }
      return { opened, closedAt };
    });

  return { isExpanded: (id) => expandedIn(state, id), toggle };
}
