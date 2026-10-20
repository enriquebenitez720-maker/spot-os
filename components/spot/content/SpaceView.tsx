import { SpotIcons } from "@/components/spot/Icons";
import { SpaceMarker } from "@/components/spot/SpaceMarker";
import { EmptyState } from "@/components/spot/content/EmptyState";
import { EntityRow, EntityRows } from "@/components/spot/content/EntityRow";
import { PageHeader } from "@/components/spot/content/PageHeader";
import { Panel } from "@/components/spot/content/Panel";
import { countLabel } from "@/lib/spot/format";
import { spotRoutes } from "@/lib/spot/navigation";
import { countLists } from "@/lib/spot/tree";
import type { SpaceNode } from "@/lib/spot/types";

// Contenido de un espacio: cada carpeta con sus listas, para ver toda la
// estructura del espacio de un vistazo.
export function SpaceView({ space }: { space: SpaceNode }) {
  return (
    <div className="spot-page">
      <PageHeader
        eyebrow="Espacio"
        media={<SpaceMarker space={space} size="lg" />}
        title={space.name}
        description={space.description}
        meta={
          <>
            <span className="spot-chip">{countLabel(space.folders.length, "carpeta", "carpetas")}</span>
            <span className="spot-chip">{countLabel(countLists(space), "lista", "listas")}</span>
          </>
        }
      />

      {space.folders.length > 0 ? (
        <div className="spot-stack">
          {space.folders.map((folder) => (
            <Panel
              key={folder.id}
              title={folder.name}
              href={spotRoutes.folder(folder.id)}
              icon={<SpotIcons.folder />}
              description={folder.description}
              count={countLabel(folder.lists.length, "lista", "listas")}
            >
              <EntityRows emptyText={folder.lists.length === 0 ? "Esta carpeta todavía no tiene listas." : undefined}>
                {folder.lists.map((list) => (
                  <EntityRow key={list.id} href={spotRoutes.list(list.id)} title={list.name} meta={list.description} icon={<SpotIcons.list />} />
                ))}
              </EntityRows>
            </Panel>
          ))}
        </div>
      ) : (
        <EmptyState title="Este espacio todavía no tiene carpetas" description="Las carpetas organizan las listas de trabajo del espacio." />
      )}
    </div>
  );
}
