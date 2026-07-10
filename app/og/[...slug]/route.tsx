import { readFileSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getPageImage, source } from "@/lib/source";

export const revalidate = false;

const logo = readFileSync(join(process.cwd(), "public/logo.svg"));
const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

// Section label derived from the first slug segment
const SECTIONS: Record<string, string> = {
  guides: "Guides",
  api: "API",
  sdk: "SDK",
  mcp: "MCP",
};

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/[...slug]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const section = SECTIONS[slug[0]] ?? "Docs";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 85% -10%, rgba(65, 198, 166, 0.28), rgba(10, 10, 10, 0)), radial-gradient(ellipse 60% 40% at -5% 110%, rgba(65, 198, 166, 0.12), rgba(10, 10, 10, 0))",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: satori requires plain img */}
        <img src={logoSrc} width={148} height={40} alt="Bold" />
        <div
          style={{
            fontSize: 30,
            color: "#fafafa",
            paddingLeft: 20,
            borderLeft: "2px solid rgba(250, 250, 250, 0.25)",
          }}
        >
          {section}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: page.data.title.length > 32 ? 60 : 76,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {page.data.title}
        </div>
        {page.data.description ? (
          <div
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: 960,
            }}
          >
            {page.data.description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 26, color: "#41C6A6" }}>docs.boldvideo.com</div>
        <div
          style={{
            width: 220,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#41C6A6",
          }}
        />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
