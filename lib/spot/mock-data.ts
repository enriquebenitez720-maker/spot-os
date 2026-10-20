// SPOT OS · datos de ejemplo de la etapa 1.
//
// Están en la forma "plana" (cada entidad con el id de su padre), que es la
// misma forma en que los va a devolver una base de datos o una API. Para
// reemplazarlos por datos reales alcanza con cambiar lib/spot/workspace.ts;
// la interfaz no importa este archivo directamente.

import type { Folder, List, Space, Workspace } from "@/lib/spot/types";

export const MOCK_WORKSPACE: Workspace = { id: "spot", name: "SPOT OS" };

export const MOCK_SPACES: Space[] = [
  {
    id: "marketing",
    workspaceId: "spot",
    name: "Marketing",
    color: "#f0653a",
    description: "Clientes, redes sociales y campañas.",
  },
  {
    id: "diseno",
    workspaceId: "spot",
    name: "Diseño",
    color: "#a855f7",
    description: "Piezas para clientes y material interno.",
  },
  {
    id: "desarrollo",
    workspaceId: "spot",
    name: "Desarrollo",
    color: "#14b8a6",
    description: "Proyectos de software y herramientas internas.",
  },
  {
    id: "administracion",
    workspaceId: "spot",
    name: "Administración",
    color: "#f59e0b",
    description: "Finanzas y recursos humanos.",
  },
];

// Los ids llevan el prefijo del espacio porque hay nombres repetidos
// ("Clientes" existe en Marketing y en Diseño) y el id tiene que ser único.
export const MOCK_FOLDERS: Folder[] = [
  { id: "marketing-clientes", spaceId: "marketing", name: "Clientes", description: "Una lista por cuenta activa." },
  { id: "marketing-redes-sociales", spaceId: "marketing", name: "Redes Sociales", description: "Contenido y pauta de las cuentas de SPOT." },
  { id: "marketing-campanas", spaceId: "marketing", name: "Campañas", description: "Acciones con fecha de inicio y fin." },
  { id: "diseno-clientes", spaceId: "diseno", name: "Clientes", description: "Piezas gráficas por cuenta." },
  { id: "diseno-interno", spaceId: "diseno", name: "Diseño Interno", description: "Marca y material propio de SPOT." },
  { id: "desarrollo-proyectos", spaceId: "desarrollo", name: "Proyectos", description: "Software para clientes y productos propios." },
  { id: "desarrollo-interno", spaceId: "desarrollo", name: "Desarrollo Interno", description: "Infraestructura y automatizaciones." },
  { id: "administracion-finanzas", spaceId: "administracion", name: "Finanzas", description: "Facturación, cobros y pagos." },
  { id: "administracion-rrhh", spaceId: "administracion", name: "Recursos Humanos", description: "Equipo, búsquedas e ingresos." },
];

// Las dos primeras son las del pedido original; el resto son ejemplos para
// que cada carpeta tenga contenido mientras no haya datos reales.
export const MOCK_LISTS: List[] = [
  { id: "cliente-abc", folderId: "marketing-clientes", name: "Cliente ABC", description: "Plan mensual de contenidos y pauta." },
  { id: "cliente-xyz", folderId: "marketing-clientes", name: "Cliente XYZ", description: "Lanzamiento de producto y redes." },
  { id: "contenido-mensual", folderId: "marketing-redes-sociales", name: "Contenido mensual" },
  { id: "pauta-publicitaria", folderId: "marketing-redes-sociales", name: "Pauta publicitaria" },
  { id: "lanzamiento-spot-os", folderId: "marketing-campanas", name: "Lanzamiento SPOT OS" },
  { id: "campana-de-temporada", folderId: "marketing-campanas", name: "Campaña de temporada" },
  { id: "diseno-cliente-abc", folderId: "diseno-clientes", name: "Cliente ABC" },
  { id: "diseno-cliente-xyz", folderId: "diseno-clientes", name: "Cliente XYZ" },
  { id: "identidad-spot", folderId: "diseno-interno", name: "Identidad SPOT" },
  { id: "plantillas", folderId: "diseno-interno", name: "Plantillas" },
  { id: "proyecto-spot-os", folderId: "desarrollo-proyectos", name: "SPOT OS" },
  { id: "sitio-web-spot", folderId: "desarrollo-proyectos", name: "Sitio web de SPOT" },
  { id: "infraestructura", folderId: "desarrollo-interno", name: "Infraestructura" },
  { id: "automatizaciones", folderId: "desarrollo-interno", name: "Automatizaciones" },
  { id: "facturacion", folderId: "administracion-finanzas", name: "Facturación" },
  { id: "pagos-a-proveedores", folderId: "administracion-finanzas", name: "Pagos a proveedores" },
  { id: "vacantes", folderId: "administracion-rrhh", name: "Vacantes" },
  { id: "onboarding", folderId: "administracion-rrhh", name: "Onboarding" },
];
