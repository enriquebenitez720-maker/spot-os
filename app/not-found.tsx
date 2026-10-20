import Link from "next/link";
import { EmptyState } from "@/components/spot/content/EmptyState";
import { PageHeader } from "@/components/spot/content/PageHeader";
import { spotRoutes } from "@/lib/spot/navigation";

// Se muestra dentro del shell cuando la URL apunta a un espacio, carpeta o
// lista que no existe.
export default function SpotNotFound() {
  return (
    <div className="spot-page">
      <PageHeader eyebrow="SPOT OS" title="No encontramos eso" />
      <EmptyState title="El espacio, carpeta o lista no existe" description="Puede que el enlace esté mal o que el elemento se haya movido.">
        <Link href={spotRoutes.home()} className="spot-btn">
          Volver al inicio
        </Link>
      </EmptyState>
    </div>
  );
}
