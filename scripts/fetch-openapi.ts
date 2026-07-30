import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";

const OPENAPI_URL =
  process.env.OPENAPI_URL || "https://app.boldvideo.io/api/openapi";

// Operations the backend advertises but the public docs must not show. The
// API token ships in client-side code, so documenting write endpoints that
// mutate the library invites abuse. Removed on every fetch so they cannot
// reappear when the backend spec changes.
const EXCLUDED_OPERATIONS: Array<{ path: string; method: string }> = [
  { path: "/api/v1/videos", method: "post" },
];

function sanitizeSpec(spec: Record<string, unknown>): Record<string, unknown> {
  const paths = spec.paths as
    | Record<string, Record<string, unknown>>
    | undefined;

  if (paths) {
    for (const excluded of EXCLUDED_OPERATIONS) {
      delete paths[excluded.path]?.[excluded.method];
    }

    for (const path of Object.keys(paths)) {
      const methods = [
        "get",
        "post",
        "put",
        "delete",
        "patch",
        "head",
        "options",
      ];
      for (const method of methods) {
        // Remove placeholder operations like "get": "ok"
        if (
          paths[path][method] === "ok" ||
          typeof paths[path][method] === "string"
        ) {
          delete paths[path][method];
        }
        // Backend operationIds can carry " (2)"-style dedup suffixes, which
        // leak into generated filenames. Normalize them to "_2".
        const operation = paths[path][method] as
          | { operationId?: string }
          | undefined;
        if (operation?.operationId) {
          operation.operationId = operation.operationId.replace(
            /\s*\((\d+)\)$/,
            "_$1",
          );
        }
      }
      // Remove empty path objects
      if (Object.keys(paths[path]).length === 0) {
        delete paths[path];
      }
    }
  }

  // The top-level tags array drives per-tag doc generation, and the backend
  // only declares a subset. Rebuild it from the tags operations actually use,
  // preserving any descriptions the spec does declare.
  const declared = new Map(
    (Array.isArray(spec.tags)
      ? (spec.tags as Array<{ name: string }>)
      : []
    ).map((tag) => [tag.name, tag]),
  );
  const used = new Set<string>();
  if (paths) {
    for (const path of Object.values(paths)) {
      for (const operation of Object.values(path)) {
        const tags = (operation as { tags?: string[] })?.tags;
        for (const tag of tags ?? []) used.add(tag);
      }
    }
  }
  spec.tags = [...used].map((name) => declared.get(name) ?? { name });

  return spec;
}

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_URL}...`);

  const response = await fetch(OPENAPI_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`,
    );
  }

  let spec = await response.json();
  spec = sanitizeSpec(spec);

  if (!existsSync("./openapi")) {
    await mkdir("./openapi", { recursive: true });
  }

  await writeFile("./openapi/spec.json", JSON.stringify(spec, null, 2));

  console.log("OpenAPI spec saved to ./openapi/spec.json");
}

main().catch(console.error);
