// Isotipo de SPOT OS: un "spot" (punto con brillo) sobre una placa redondeada.
// Toma los colores de los tokens --sp-accent / --sp-accent-ink (ver app/spot.css).
export function SpotLogo({ size = 30 }: { size?: number }) {
  return (
    <svg className="spot-brand-mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect className="spot-brand-mark-bg" x="1" y="1" width="30" height="30" rx="9" />
      <circle className="spot-brand-mark-dot" cx="16" cy="16" r="7.5" />
      <circle className="spot-brand-mark-bg" cx="18.6" cy="13.4" r="2.4" />
    </svg>
  );
}
