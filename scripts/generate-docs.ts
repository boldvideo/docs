import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { generateFiles } from "fumadocs-openapi";
import { openapi } from "../lib/openapi";

// Sidebar order and display titles for the generated reference pages (one
// page per OpenAPI tag; filenames are the kebab-cased tag names). The
// generator title-cases tag names ("AI Chat" -> "A I Chat"), so titles are
// patched after generation.
const GROUPS: Array<{ file: string; title: string }> = [
  { file: "videos", title: "Videos" },
  { file: "collections", title: "Collections" },
  { file: "playlists", title: "Playlists" },
  { file: "search", title: "Search" },
  { file: "settings", title: "Settings" },
  { file: "ai-chat", title: "AI Chat" },
  { file: "ai-search", title: "AI Search" },
  { file: "ai-recommendations", title: "AI Recommendations" },
  { file: "ai-conversations", title: "AI Conversations" },
  { file: "viewers", title: "Viewers" },
  { file: "progress", title: "Progress" },
  { file: "community", title: "Community" },
  { file: "auth-sessions", title: "Auth Sessions" },
  { file: "auth-challenges", title: "Auth Challenges" },
  { file: "session-management", title: "Session Management" },
  { file: "admin-viewers", title: "Admin: Viewers" },
  { file: "admin-auth-sessions", title: "Admin: Sessions" },
  { file: "admin-auth-policy", title: "Admin: Auth Policy" },
];

async function main() {
  await generateFiles({
    input: openapi,
    output: "./content/docs/api/reference",
    per: "tag",
  });

  // The reference folder is gitignored and fully regenerated, so nav metadata
  // and title fixes have to be applied here rather than committed by hand.
  const known: string[] = [];
  for (const group of GROUPS) {
    const path = `./content/docs/api/reference/${group.file}.mdx`;
    if (!existsSync(path)) continue;
    known.push(group.file);
    const content = await readFile(path, "utf-8");
    await writeFile(
      path,
      content.replace(/^title: .*$/m, `title: ${JSON.stringify(group.title)}`),
    );
  }

  await writeFile(
    "./content/docs/api/reference/meta.json",
    `${JSON.stringify({ title: "Reference", pages: [...known, "..."] }, null, 2)}\n`,
  );

  console.log(`API docs generated successfully (${known.length} tag pages)!`);
}

main().catch(console.error);
