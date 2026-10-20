import Link from "next/link";
import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  /** Si se indica, el título es un enlace. */
  href?: string;
  icon?: ReactNode;
  description?: string;
  /** Texto chico a la derecha del título ("2 listas"). */
  count?: string;
  children: ReactNode;
}

// Bloque con cabecera (ícono, título, descripción, conteo) y un cuerpo que
// suele ser una lista de filas (EntityRow).
export function Panel({ title, href, icon, description, count, children }: PanelProps) {
  return (
    <section className="spot-panel" aria-label={title}>
      <header className="spot-panel-head">
        {icon ? <span className="spot-panel-icon">{icon}</span> : null}
        <div className="spot-panel-title">
          <h2>{href ? <Link href={href}>{title}</Link> : title}</h2>
          {description ? <p className="spot-panel-desc">{description}</p> : null}
        </div>
        {count ? <span className="spot-count">{count}</span> : null}
      </header>
      <div className="spot-panel-body">{children}</div>
    </section>
  );
}
