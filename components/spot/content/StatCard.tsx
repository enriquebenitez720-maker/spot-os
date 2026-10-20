import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  hint?: string;
}

// Indicador de la pantalla de inicio (cantidad de espacios, carpetas, etc.).
export function StatCard({ label, value, icon, hint }: StatCardProps) {
  return (
    <div className="spot-stat">
      <div className="spot-stat-head">
        <span>{label}</span>
        {icon}
      </div>
      <div className="spot-stat-value">{value}</div>
      {hint ? <div className="spot-stat-hint">{hint}</div> : null}
    </div>
  );
}
