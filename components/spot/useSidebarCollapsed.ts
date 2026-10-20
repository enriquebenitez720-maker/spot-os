"use client";

import { useSyncExternalStore } from "react";

// Si la barra lateral está contraída. Se recuerda en el navegador para que
// al volver a entrar quede como la dejaste: localStorage como fuente y un
// evento propio para avisar a los suscriptores (useSyncExternalStore).

const KEY = "spot-sidebar-v1";
const EVENT = "spot:sidebar";

// Respaldo en memoria para cuando no hay almacenamiento (modo privado):
// la barra se sigue pudiendo contraer, solo que no se recuerda.
let fallback = false;

function read(): boolean {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored !== null) return stored === "collapsed";
  } catch {
    // Sin almacenamiento: se usa el respaldo.
  }
  return fallback;
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useSidebarCollapsed(): [collapsed: boolean, setCollapsed: (value: boolean) => void] {
  // En el servidor (y durante la hidratación) la barra siempre arranca expandida.
  const collapsed = useSyncExternalStore(subscribe, read, () => false);

  const setCollapsed = (value: boolean) => {
    fallback = value;
    try {
      localStorage.setItem(KEY, value ? "collapsed" : "expanded");
    } catch {
      // Sin almacenamiento: queda solo el respaldo en memoria.
    }
    window.dispatchEvent(new Event(EVENT));
  };

  return [collapsed, setCollapsed];
}
