import Link from "next/link";
import type { ReactNode } from "react";
import { SpotIcons } from "@/components/spot/Icons";

interface EntityRowProps {
  href: string;
  title: string;
  meta?: string;
  icon: ReactNode;
}

// Fila-enlace dentro de un Panel. Se agrupan con <div className="spot-items">.
export function EntityRow({ href, title, meta, icon }: EntityRowProps) {
  return (
    <Link href={href} className="spot-item">
      <span className="spot-item-icon">{icon}</span>
      <span className="spot-item-body">
        <span className="spot-item-title">{title}</span>
        {meta ? <span className="spot-item-meta">{meta}</span> : null}
      </span>
      <span className="spot-item-arrow" aria-hidden="true">
        <SpotIcons.chevron />
      </span>
    </Link>
  );
}

export function EntityRows({ children, emptyText }: { children: ReactNode; emptyText?: string }) {
  return (
    <div className="spot-items">
      {children}
      {emptyText ? <p className="spot-items-empty">{emptyText}</p> : null}
    </div>
  );
}
