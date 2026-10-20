import Link from "next/link";
import type { ReactNode } from "react";
import { SpotIcons } from "@/components/spot/Icons";

interface EntityCardProps {
  href: string;
  title: string;
  meta: string;
  icon: ReactNode;
  description?: string;
}

// Tarjeta-enlace a un espacio, carpeta o lista.
export function EntityCard({ href, title, meta, icon, description }: EntityCardProps) {
  return (
    <Link href={href} className="spot-card spot-card--link">
      <span className="spot-card-icon">{icon}</span>
      <span className="spot-card-body">
        <span className="spot-card-title">{title}</span>
        {description ? <span className="spot-card-desc">{description}</span> : null}
        <span className="spot-card-meta">{meta}</span>
      </span>
      <span className="spot-card-arrow" aria-hidden="true">
        <SpotIcons.chevron />
      </span>
    </Link>
  );
}
