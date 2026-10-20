import { NextResponse, type NextRequest } from "next/server";

// Corre antes de cada página: arma una Content-Security-Policy con un nonce
// único por pedido (contra XSS). Por eso las páginas se renderizan por pedido
// (ver connection() en app/layout.tsx). Cuando SPOT OS tenga autenticación,
// el chequeo de sesión va acá.

function armarCsp(nonce: string): string {
  const esDev = process.env.NODE_ENV === "development";
  return `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${esDev ? " 'unsafe-eval'" : ""};
    style-src 'self' ${esDev ? "'unsafe-inline'" : `'nonce-${nonce}'`};
    style-src-attr 'unsafe-inline';
    img-src 'self' blob: data:;
    connect-src 'self';
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = armarCsp(nonce);

  const cabecerasPedido = new Headers(request.headers);
  cabecerasPedido.set("x-nonce", nonce);
  cabecerasPedido.set("Content-Security-Policy", csp);

  const respuesta = NextResponse.next({ request: { headers: cabecerasPedido } });
  respuesta.headers.set("Content-Security-Policy", csp);
  return respuesta;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
