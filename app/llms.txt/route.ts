import { BASE_URL, getMarkdownUrl, source } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const lines: string[] = [
    "# Bold Video Documentation",
    "",
    "> Bold turns video libraries into searchable, AI-queryable knowledge for course creators, coaching programs, and teams. These docs cover the admin panel, the REST API, the JavaScript SDK, and the MCP server.",
    "",
    `Full content of every page: ${BASE_URL}/llms-full.txt`,
    `API endpoint catalog: https://app.boldvideo.io/llms.txt`,
    `OpenAPI spec: https://app.boldvideo.io/api/openapi`,
    "",
    "## Pages",
    "",
  ];

  for (const page of source.getPages()) {
    const description = page.data.description
      ? ` — ${page.data.description}`
      : "";
    lines.push(`- [${page.data.title}](${getMarkdownUrl(page)})${description}`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
