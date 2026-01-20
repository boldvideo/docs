# AGENTS.md - Bold Docs

Documentation site for Bold Video, built with Fumadocs and Next.js.

## Stack

- **Framework**: Next.js 16 (App Router, RSC)
- **Docs Framework**: Fumadocs (fumadocs-ui, fumadocs-mdx, fumadocs-core)
- **OpenAPI**: fumadocs-openapi for auto-generated API reference docs
- **Styling**: Tailwind CSS v4
- **Linting/Formatting**: Biome
- **Package Manager**: Bun
- **Language**: TypeScript

## Commands

```bash
# Development
bun run dev

# Build
bun run build

# Type checking
bun run types:check

# Linting
bun run lint

# Formatting
bun run format

# OpenAPI docs generation
bun run fetch:openapi      # Fetch spec from Phoenix backend
bun run generate:api-docs  # Generate MDX pages from spec
```

## Project Structure

```
app/                    # Next.js App Router
  (docs)/               # Docs layout group
    [[...slug]]/        # Catch-all docs pages
  api/                  # API routes (search)
  global.css            # Tailwind + Fumadocs styles

content/docs/           # MDX documentation content
  api/                  # API reference section
    reference/          # Auto-generated from OpenAPI (gitignored)
  guides/               # User guides
  sdk/                  # SDK documentation

components/             # React components
  api-page.tsx          # OpenAPI page renderer

lib/
  source.ts             # Fumadocs source loader
  openapi.ts            # OpenAPI server config

scripts/
  fetch-openapi.ts      # Fetches OpenAPI spec from backend
  generate-docs.ts      # Generates MDX from OpenAPI spec

openapi/
  spec.json             # OpenAPI spec file (gitignored, fetched from backend)
```

## Content Conventions

- Docs are written in MDX in `content/docs/`
- Each folder needs a `meta.json` for navigation ordering
- Frontmatter supports `title`, `description`, `full`, `updated_at`
- Use `"pages": ["..."]` in meta.json to auto-include all pages

## OpenAPI Integration

The API reference at `/api/reference/*` is auto-generated from the Phoenix backend's OpenAPI spec:

1. Backend serves spec at `https://app.boldvideo.io/api/openapi`
2. `bun run fetch:openapi` downloads it to `openapi/spec.json`
3. `bun run generate:api-docs` creates MDX pages in `content/docs/api/reference/`
4. Generated files are gitignored - regenerate during build/deploy

The `APIPage` component from fumadocs-openapi renders interactive API docs with:
- Request/response schemas
- Code samples
- Interactive playground ("Try it")

## Code Style

- Use Biome for linting and formatting (not ESLint/Prettier)
- Run `bun run format` before committing
- No semicolons in config, but follow existing file conventions
- Use `@/` path alias for imports from project root
