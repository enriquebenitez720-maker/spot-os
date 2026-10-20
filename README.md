# SPOT OS

Aplicación de SPOT para organizar trabajo, proyectos y equipos, inspirada en
herramientas como ClickUp y Plane. Se construye por etapas.

Stack: Next.js 16 (App Router) + React 19 + TypeScript. Sin base de datos ni
autenticación todavía.

## Etapa 1 · Shell + navegación + jerarquía (hecha)

Jerarquía: **Workspace → Espacios → Carpetas → Listas** (→ Tareas → Subtareas en
etapas siguientes).

| Ruta | Qué muestra |
|---|---|
| `/` | Inicio: bienvenida, indicadores, tarjetas de los espacios, todas las listas con su ubicación y la explicación de la jerarquía |
| `/espacios/[id]` | Un espacio: cada carpeta con sus listas adentro |
| `/carpetas/[id]` | Una carpeta: sus listas y accesos a las otras carpetas del espacio |
| `/listas/[id]` | Una lista: a qué espacio y carpeta pertenece, el marco de la tabla de tareas (vacío hasta la etapa 2) y accesos a las otras listas |

Funciona: abrir/cerrar la barra lateral (se recuerda), expandir/contraer
espacios y carpetas, seleccionar espacios, carpetas y listas, breadcrumb
dinámico, estado visual del elemento seleccionado, modo oscuro automático y
responsive (en celular y tablet la barra es un menú lateral desplegable).

## Cómo correrlo

Necesitás Node.js 20.9 o más nuevo.

```bash
npm install
npm run dev
```

Abrí http://localhost:3000.

Comprobaciones: `npm run lint`, `npm run typecheck` y `npm run build`.

## Publicar en Vercel

1. Subí esta carpeta a un repositorio de GitHub propio (por ejemplo `spot-os`).
2. En https://vercel.com: **Add New → Project**, importá ese repositorio y
   tocá **Deploy**. No hace falta configurar nada: Vercel detecta Next.js.
3. Cada vez que se suba un cambio a la rama principal, Vercel lo publica solo.

## Dónde está cada cosa

```
app/                           Rutas (App Router)
  layout.tsx                   Carga el árbol y monta el AppShell; metadata "… · SPOT OS"
  page.tsx                     Inicio
  espacios/[spaceId]/page.tsx  Vista de espacio
  carpetas/[folderId]/page.tsx Vista de carpeta
  listas/[listId]/page.tsx     Vista de lista
  loading.tsx                  Esqueleto mientras carga la pantalla siguiente
  not-found.tsx                Espacio/carpeta/lista inexistente (dentro del shell)
  globals.css                  Base del documento (tipografía, resets)
  spot.css                     Tokens (--sp-*) y estilos (clases spot-*)

components/spot/               Interfaz
  AppShell.tsx                 Sidebar + área principal; estado de barra contraída y menú del celular
  useSidebarCollapsed.ts       Barra contraída, recordada en localStorage
  Sidebar.tsx, SidebarHeader.tsx
  WorkspaceNavigation.tsx      Sección "Espacios": el árbol
  SpaceItem / FolderItem / ListItem.tsx, TreeRow.tsx
  useTreeExpansion.ts          Estado abierto/cerrado del árbol
  useSpotLocation.ts           Selección actual derivada de la URL
  Breadcrumb.tsx, MainContent.tsx
  SpaceMarker.tsx, SpotLogo.tsx, Icons.tsx
  content/                     Contenido del área principal
    DashboardHome, SpaceView, FolderView, ListView
    PageHeader, EntityCard, Panel, EntityRow, StatCard
    HierarchyStrip, SummaryStrip, TaskTablePreview, SiblingLinks, EmptyState

lib/spot/                      Dominio, sin React
  types.ts                     Workspace, Space, Folder, List y los nodos del árbol
  mock-data.ts                 Datos de ejemplo en forma plana (como vendrían de una API)
  workspace.ts                 Acceso a datos: el único lugar que sabe de dónde salen
  navigation.ts                Rutas, lectura de la URL, breadcrumb, camino de ancestros
  tree.ts                      Consultas sobre el árbol
  format.ts                    Textos como "3 carpetas"

proxy.ts                       Content-Security-Policy con nonce por pedido
```

## Datos

Los datos de ejemplo viven en `lib/spot/mock-data.ts`, en forma plana (cada
entidad con el id de su padre). `lib/spot/workspace.ts` es **el único archivo
que sabe de dónde salen los datos**: sus funciones ya son asíncronas, así que
para pasar a una base de datos o una API se cambia solo ese archivo.

Las listas "Cliente ABC" y "Cliente XYZ" de Marketing / Clientes son las del
pedido original; las demás son ejemplos para que cada pantalla tenga contenido.

## Decisiones técnicas

- **Render por pedido.** El proxy arma un CSP con nonce por pedido, lo que
  impide prerenderizar; `app/layout.tsx` llama a `connection()`.
- **Estado derivado, sin efectos.** La selección sale de la URL
  (`useSpotLocation`); el árbol abre por defecto el camino hacia la selección y
  recuerda lo que el usuario abrió o cerró a mano (`useTreeExpansion`); el menú
  del celular se cierra solo al navegar. Evita sincronizar estado con la URL en
  `useEffect`, que la configuración de ESLint marca como error.
- **Estilos.** CSS plano con variables (`--sp-*`) y clases con prefijo
  `spot-`, en un solo archivo. Modo oscuro por `prefers-color-scheme`.
  Tipografía Manrope, servida desde el propio sitio.
- **Nombres.** Código en inglés (Space, Folder, List); textos de pantalla y
  URLs en español.

## Próximas etapas (no implementadas)

1. Tareas y subtareas dentro de una lista: modelo, vista de lista, alta y edición.
2. Persistencia real (por ejemplo Supabase) detrás de `lib/spot/workspace.ts`.
3. Autenticación y permisos.
