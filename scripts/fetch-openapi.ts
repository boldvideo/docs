import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const OPENAPI_URL =
  process.env.OPENAPI_URL || 'https://app.boldvideo.io/api/openapi';

function sanitizeSpec(spec: Record<string, unknown>): Record<string, unknown> {
  const paths = spec.paths as Record<string, Record<string, unknown>> | undefined;

  if (paths) {
    for (const path of Object.keys(paths)) {
      const methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'];
      for (const method of methods) {
        // Remove placeholder operations like "get": "ok"
        if (paths[path][method] === 'ok' || typeof paths[path][method] === 'string') {
          delete paths[path][method];
        }
      }
      // Remove empty path objects
      if (Object.keys(paths[path]).length === 0) {
        delete paths[path];
      }
    }
  }

  // Add default tags if missing
  if (!spec.tags || (Array.isArray(spec.tags) && spec.tags.length === 0)) {
    spec.tags = [
      { name: 'Videos', description: 'Video management endpoints' },
      { name: 'Collections', description: 'Collection management endpoints' },
      { name: 'AI', description: 'AI-powered features' },
    ];
  }

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

  if (!existsSync('./openapi')) {
    await mkdir('./openapi', { recursive: true });
  }

  await writeFile('./openapi/spec.json', JSON.stringify(spec, null, 2));

  console.log('OpenAPI spec saved to ./openapi/spec.json');
}

main().catch(console.error);
