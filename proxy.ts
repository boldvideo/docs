import { getNegotiator } from "fumadocs-core/negotiation";
import { type NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const explicitMarkdown = pathname.endsWith(".md");
  if (!explicitMarkdown && pathname.includes(".")) return NextResponse.next();

  // Prefer HTML for wildcards, but respect Accept order and quality weights.
  const prefersMarkdown =
    getNegotiator(request).mediaType(["text/html", "text/markdown"]) ===
    "text/markdown";

  if (
    (request.method === "GET" || request.method === "HEAD") &&
    (explicitMarkdown || prefersMarkdown)
  ) {
    const url = request.nextUrl.clone();
    const path = explicitMarkdown ? pathname.slice(0, -3) : pathname;
    url.pathname = `/llms.mdx${path === "/" ? "/index" : path}`;
    return NextResponse.rewrite(url, { headers: { Vary: "Accept" } });
  }

  return NextResponse.next({ headers: { Vary: "Accept" } });
}

export const config = {
  matcher: ["/((?!_next/|llms\\.mdx/|api/(?:search|proxy)(?:/|$)|og/).*)"],
};
