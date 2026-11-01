import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/lib/auth";

/**
 * Reload-safe guard for member routes. Next.js 16 runs proxy files on the
 * Node.js runtime, so the Mongo-backed auth instance can be used here.
 */
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/events/new", "/events/manage", "/events/joined", "/events/:id/edit", "/profile"],
};
