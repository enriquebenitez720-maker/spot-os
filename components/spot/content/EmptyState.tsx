import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  /** `placeholder` reserva el lugar de algo que llega en una etapa posterior. */
  variant?: "empty" | "placeholder";
  children?: ReactNode;
}

export function EmptyState({ title, description, icon, variant = "empty", children }: EmptyStateProps) {
  return (
    <div className={variant === "placeholder" ? "spot-placeholder" : "spot-empty"}>
      {icon}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {children}
    </div>
  );
}
