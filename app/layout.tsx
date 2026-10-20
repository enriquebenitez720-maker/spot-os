import type { Metadata } from "next";
import { connection } from "next/server";
// Tipografía servida desde el propio sitio (sin pedidos a Google Fonts).
import "@fontsource-variable/manrope";
import "./globals.css";
import "./spot.css";
import { AppShell } from "@/components/spot/AppShell";
import { getWorkspaceTree } from "@/lib/spot/workspace";

export const metadata: Metadata = {
  title: { default: "SPOT OS", template: "%s · SPOT OS" },
  description: "Organiza tu trabajo, proyectos y equipos desde un solo lugar.",
};

// Layout raíz. Se mantiene montado mientras el usuario navega por la
// jerarquía: solo cambia el contenido de la derecha.
export default async function RootLayout({ children }: LayoutProps<"/">) {
  // El proxy arma una Content-Security-Policy con un nonce distinto por pedido,
  // y eso exige que las páginas se rendericen por pedido (no se pueden
  // prerenderizar en el build). connection() lo garantiza para toda la app.
  await connection();
  const tree = await getWorkspaceTree();

  return (
    <html lang="es">
      <body>
        <AppShell tree={tree}>{children}</AppShell>
      </body>
    </html>
  );
}
