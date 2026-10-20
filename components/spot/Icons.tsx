// Íconos de SPOT OS: SVG inline de trazo fino, sin dependencias.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const SpotIcons = {
  home: () => (
    <svg {...base}>
      <path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" />
    </svg>
  ),
  layers: () => (
    <svg {...base}>
      <path d="m12 4 8 4-8 4-8-4z" />
      <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
    </svg>
  ),
  folder: () => (
    <svg {...base}>
      <path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h4.2l2 2H19a1.5 1.5 0 0 1 1.5 1.5V17a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17z" />
    </svg>
  ),
  list: () => (
    <svg {...base}>
      <path d="M9 7h11M9 12h11M9 17h11" />
      <path d="M4.5 7h.01M4.5 12h.01M4.5 17h.01" strokeWidth={2.5} />
    </svg>
  ),
  tasks: () => (
    <svg {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <path d="m8 12 2.8 2.8L16.5 9" />
    </svg>
  ),
  chevron: () => (
    <svg {...base}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  panel: () => (
    <svg {...base}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M9.5 4.5v15" />
    </svg>
  ),
  menu: () => (
    <svg {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: () => (
    <svg {...base}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
};

export type SpotIconName = keyof typeof SpotIcons;
