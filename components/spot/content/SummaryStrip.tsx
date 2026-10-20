import Link from "next/link";
import type { ReactNode } from "react";

export interface SummaryItem {
  label: string;
  value: ReactNode;
  href?: string;
}

// Fila de datos clave de una pantalla (a qué espacio y carpeta pertenece, cuántas tareas tiene).
export function SummaryStrip({ items }: { items: SummaryItem[] }) {
  return (
    <div className="spot-summary">
      {items.map((item) =>
        item.href ? (
          <Link key={item.label} href={item.href} className="spot-summary-item">
            <span className="spot-summary-label">{item.label}</span>
            <span className="spot-summary-value">{item.value}</span>
          </Link>
        ) : (
          <div key={item.label} className="spot-summary-item">
            <span className="spot-summary-label">{item.label}</span>
            <span className="spot-summary-value">{item.value}</span>
          </div>
        ),
      )}
    </div>
  );
}
