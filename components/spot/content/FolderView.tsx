import { SpotIcons } from "@/components/spot/Icons";
import { SpaceMarker } from "@/components/spot/SpaceMarker";
import { EntityRow, EntityRows } from "@/components/spot/content/EntityRow";
import { PageHeader } from "@/components/spot/content/PageHeader";
import { Panel } from "@/components/spot/content/Panel";
import { SiblingLinks } from "@/components/spot/content/SiblingLinks";
import { countLabel } from "@/lib/spot/format";
import { spotRoutes } from "@/lib/spot/navigation";
import type { FolderNode, SpaceNode } from "@/lib/spot/types";

// Contenido de una carpeta: sus listas, y acceso a las otras carpetas del espacio.
export function FolderView({ space, folder }: { space: SpaceNode; folder: FolderNode }) {
  return (
    <div className="spot-page">
      <PageHeader
        eyebrow={`Carpeta · ${space.name}`}
        marker={<SpaceMarker space={space} />}
        title={folder.name}
        description={folder.description}
        meta={<span className="spot-chip">{countLabel(folder.lists.length, "lista", "listas")}</span>}
      />

      <Panel title="Listas" icon={<SpotIcons.list />} count={countLabel(folder.lists.length, "lista", "listas")}>
        <EntityRows emptyText={folder.lists.length === 0 ? "Esta carpeta todavía no tiene listas." : undefined}>
          {folder.lists.map((list) => (
            <EntityRow key={list.id} href={spotRoutes.list(list.id)} title={list.name} meta={list.description} icon={<SpotIcons.list />} />
          ))}
        </EntityRows>
      </Panel>

      <SiblingLinks
        label={`Otras carpetas de ${space.name}:`}
        items={space.folders.map((sibling) => ({ href: spotRoutes.folder(sibling.id), name: sibling.name, current: sibling.id === folder.id }))}
      />
    </div>
  );
}
