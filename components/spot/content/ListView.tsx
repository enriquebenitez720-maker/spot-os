import { SpotIcons } from "@/components/spot/Icons";
import { SpaceMarker } from "@/components/spot/SpaceMarker";
import { PageHeader } from "@/components/spot/content/PageHeader";
import { SiblingLinks } from "@/components/spot/content/SiblingLinks";
import { SummaryStrip } from "@/components/spot/content/SummaryStrip";
import { TaskTablePreview } from "@/components/spot/content/TaskTablePreview";
import { spotRoutes } from "@/lib/spot/navigation";
import type { FolderNode, ListNode, SpaceNode } from "@/lib/spot/types";

interface ListViewProps {
  space: SpaceNode;
  folder: FolderNode;
  list: ListNode;
}

// Contenido de una lista: dónde está, y el lugar donde van a vivir sus tareas (etapa 2).
export function ListView({ space, folder, list }: ListViewProps) {
  return (
    <div className="spot-page">
      <PageHeader eyebrow="Lista" marker={<SpaceMarker space={space} />} title={list.name} description={list.description} />

      <SummaryStrip
        items={[
          {
            label: "Espacio",
            href: spotRoutes.space(space.id),
            value: (
              <>
                <SpaceMarker space={space} />
                {space.name}
              </>
            ),
          },
          {
            label: "Carpeta",
            href: spotRoutes.folder(folder.id),
            value: (
              <>
                <span className="spot-summary-icon">
                  <SpotIcons.folder />
                </span>
                {folder.name}
              </>
            ),
          },
          { label: "Tareas", value: "0 · próxima etapa" },
        ]}
      />

      <TaskTablePreview listName={list.name} />

      <SiblingLinks
        label={`Otras listas de ${folder.name}:`}
        items={folder.lists.map((sibling) => ({ href: spotRoutes.list(sibling.id), name: sibling.name, current: sibling.id === list.id }))}
      />
    </div>
  );
}
