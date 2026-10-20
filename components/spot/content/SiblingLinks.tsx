import Link from "next/link";

export interface SiblingLink {
  href: string;
  name: string;
  current?: boolean;
}

// Accesos a los "hermanos" de la pantalla actual (las otras carpetas del
// espacio, las otras listas de la carpeta) para moverse sin volver atrás.
export function SiblingLinks({ label, items }: { label: string; items: SiblingLink[] }) {
  if (items.length < 2) return null;
  return (
    <nav className="spot-siblings" aria-label={label}>
      <span className="spot-siblings-label">{label}</span>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="spot-chip spot-chip--link" aria-current={item.current ? "page" : undefined}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
