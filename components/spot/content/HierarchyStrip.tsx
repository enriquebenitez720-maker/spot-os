import { SpotIcons } from "@/components/spot/Icons";
import { SpotLogo } from "@/components/spot/SpotLogo";

const LEVELS = [
  { name: "Workspace", text: "SPOT OS: todo el trabajo de la empresa.", icon: <SpotLogo size={18} /> },
  { name: "Espacios", text: "Un área o equipo: Marketing, Diseño…", icon: <SpotIcons.layers /> },
  { name: "Carpetas", text: "Agrupan listas dentro de un espacio.", icon: <SpotIcons.folder /> },
  { name: "Listas", text: "Un cliente, proyecto o tema concreto.", icon: <SpotIcons.list /> },
  { name: "Tareas", text: "El trabajo en sí, con subtareas.", icon: <SpotIcons.tasks />, next: true },
];

// Explica de un vistazo la jerarquía que organiza SPOT OS.
export function HierarchyStrip() {
  return (
    <section className="spot-block" aria-labelledby="spot-jerarquia">
      <div className="spot-block-head">
        <h2 id="spot-jerarquia">Cómo se organiza SPOT OS</h2>
      </div>
      <ol className="spot-hierarchy">
        {LEVELS.map((level, index) => (
          <li key={level.name} className={level.next ? "is-next" : undefined}>
            <span className="spot-hierarchy-icon">{level.icon}</span>
            <span className="spot-hierarchy-step">{index + 1}</span>
            <b>{level.name}</b>
            <p>{level.text}</p>
            {level.next ? <span className="spot-tag">Próxima etapa</span> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
