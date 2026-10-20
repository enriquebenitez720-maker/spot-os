import { SpotIcons } from "@/components/spot/Icons";

// Lugar reservado para las tareas de una lista (etapa 2). Dibuja el marco de
// la tabla (barra, columnas) para que la pantalla ya tenga la forma final; las
// columnas son orientativas y se definen cuando se diseñen las tareas.
export function TaskTablePreview({ listName }: { listName: string }) {
  return (
    <section className="spot-table-shell" aria-labelledby="spot-tareas">
      <header className="spot-table-toolbar">
        <h2 id="spot-tareas">Tareas</h2>
        <span className="spot-count">0 tareas</span>
        <span className="spot-tag">Próxima etapa</span>
      </header>
      <div className="spot-table-head" aria-hidden="true">
        <span>Tarea</span>
        <span>Estado</span>
        <span>Responsable</span>
        <span>Vence</span>
      </div>
      <div className="spot-table-empty">
        <SpotIcons.tasks />
        <h3>Todavía no hay tareas</h3>
        <p>Acá van a aparecer las tareas y subtareas de {listName}. La lista ya tiene su lugar en la estructura.</p>
      </div>
    </section>
  );
}
