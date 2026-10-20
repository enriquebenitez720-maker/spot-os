import type { Space } from "@/lib/spot/types";

type MarkerSize = "sm" | "md" | "lg";

const CLASS_BY_SIZE: Record<MarkerSize, string> = {
  sm: "spot-space-mark",
  md: "spot-space-mark spot-space-mark--md",
  lg: "spot-space-mark spot-space-mark--lg",
};

// Marcador de un espacio: cuadrado con su color y su inicial. Se usa en el
// sidebar (también con la barra contraída), en las tarjetas y en los encabezados.
export function SpaceMarker({ space, size = "sm" }: { space: Pick<Space, "name" | "color">; size?: MarkerSize }) {
  const initial = space.name.trim().charAt(0).toUpperCase() || "·";
  return (
    <span className={CLASS_BY_SIZE[size]} style={{ background: space.color }} aria-hidden="true">
      {initial}
    </span>
  );
}
