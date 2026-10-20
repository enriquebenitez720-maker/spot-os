import { SpotIcons } from "@/components/spot/Icons";
import { SpaceMarker } from "@/components/spot/SpaceMarker";
import { EmptyState } from "@/components/spot/content/EmptyState";
import { EntityCard } from "@/components/spot/content/EntityCard";
import { EntityRow, EntityRows } from "@/components/spot/content/EntityRow";
import { HierarchyStrip } from "@/components/spot/content/HierarchyStrip";
import { PageHeader } from "@/components/spot/content/PageHeader";
import { Panel } from "@/components/spot/content/Panel";
import { StatCard } from "@/components/spot/content/StatCard";
import { countLabel } from "@/lib/spot/format";
import { spotRoutes } from "@/lib/spot/navigation";
import { countLists, flattenLists } from "@/lib/spot/tree";
import type { WorkspaceTree } from "@/lib/spot/types";
import { countWorkspace } from "@/lib/spot/workspace";

// Pantalla de inicio: bienvenida, indicadores del workspace, acceso a los
// espacios, todas las listas con su ubicación y la explicación de la jerarquía.
export function DashboardHome({ tree }: { tree: WorkspaceTree }) {
  const stats = countWorkspace(tree);
  const lists = flattenLists(tree);

  return (
    <div className="spot-page">
      <PageHeader eyebrow="Inicio" title="Bienvenido a SPOT OS" description="Organiza tu trabajo, proyectos y equipos desde un solo lugar." />

      <section className="spot-stats" aria-label="Resumen del workspace">
        <StatCard label="Espacios" value={stats.spaces} icon={<SpotIcons.layers />} />
        <StatCard label="Carpetas" value={stats.folders} icon={<SpotIcons.folder />} />
        <StatCard label="Listas" value={stats.lists} icon={<SpotIcons.list />} />
        <StatCard label="Tareas" value={stats.tasks} icon={<SpotIcons.tasks />} hint="Se habilitan en la próxima etapa" />
      </section>

      <section className="spot-block" aria-labelledby="spot-inicio-espacios">
        <div className="spot-block-head">
          <h2 id="spot-inicio-espacios">Espacios</h2>
          <span className="spot-count">{countLabel(tree.spaces.length, "espacio", "espacios")}</span>
        </div>
        {tree.spaces.length > 0 ? (
          <div className="spot-grid">
            {tree.spaces.map((space) => (
              <EntityCard
                key={space.id}
                href={spotRoutes.space(space.id)}
                title={space.name}
                description={space.description}
                meta={`${countLabel(space.folders.length, "carpeta", "carpetas")} · ${countLabel(countLists(space), "lista", "listas")}`}
                icon={<SpaceMarker space={space} size="md" />}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Todavía no hay espacios" description="Los espacios agrupan carpetas y listas por área o equipo." />
        )}
      </section>

      <Panel title="Todas las listas" icon={<SpotIcons.list />} count={countLabel(lists.length, "lista", "listas")} description="Cada lista con el espacio y la carpeta donde vive.">
        <EntityRows emptyText={lists.length === 0 ? "Todavía no hay listas." : undefined}>
          {lists.map(({ list, folder, space }) => (
            <EntityRow key={list.id} href={spotRoutes.list(list.id)} title={list.name} meta={`${space.name} / ${folder.name}`} icon={<SpaceMarker space={space} />} />
          ))}
        </EntityRows>
      </Panel>

      <HierarchyStrip />
    </div>
  );
}
