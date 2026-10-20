"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useSpotLocation } from "@/components/spot/useSpotLocation";
import { buildBreadcrumb } from "@/lib/spot/navigation";
import type { WorkspaceTree } from "@/lib/spot/types";

// SPOT OS / Marketing / Clientes / Cliente ABC. Se arma desde la URL, así
// siempre refleja la pantalla actual aunque se llegue por un enlace directo.
export function Breadcrumb({ tree }: { tree: WorkspaceTree }) {
  const { resolved } = useSpotLocation(tree);
  const crumbs = buildBreadcrumb(tree, resolved);

  return (
    <nav className="spot-breadcrumb" aria-label="Ubicación">
      <ol>
        {crumbs.map((crumb, index) => (
          <Fragment key={`${index}-${crumb.href}`}>
            {index > 0 ? (
              <li className="spot-crumb-sep" aria-hidden="true">
                /
              </li>
            ) : null}
            <li>
              {crumb.current ? (
                <span className="spot-crumb is-current" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="spot-crumb">
                  {crumb.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
