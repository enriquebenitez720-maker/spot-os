import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Qué tipo de pantalla es: "Inicio", "Espacio", "Carpeta", "Lista". */
  eyebrow: string;
  title: string;
  description?: string;
  /** Marcador chico que acompaña al eyebrow (por ejemplo, el color del espacio). */
  marker?: ReactNode;
  /** Elemento grande a la izquierda del título (por ejemplo, el marcador del espacio). */
  media?: ReactNode;
  /** Chips con datos de la pantalla ("3 carpetas", "6 listas"). */
  meta?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, marker, media, meta }: PageHeaderProps) {
  return (
    <header className={media ? "spot-page-head spot-page-head--media" : "spot-page-head"}>
      {media ? <div className="spot-page-media">{media}</div> : null}
      <div className="spot-page-text">
        <p className="spot-eyebrow">
          {marker}
          <span>{eyebrow}</span>
        </p>
        <h1>{title}</h1>
        {description ? <p className="spot-lead">{description}</p> : null}
        {meta ? <div className="spot-page-meta">{meta}</div> : null}
      </div>
    </header>
  );
}
