# bold-docs

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs

## Agent and crawler routes

- `/robots.txt` allows all crawlers and advertises `/sitemap.xml`.
- `/sitemap.xml` follows the Fumadocs source, including generated API pages.
  `lastModified` uses `updated_at`, falling back to the source file's modification
  time (captured during the build).
- Append `.md` to a docs URL for its Markdown representation; the home page is
  `/index.md` (`/.md` also works). `/llms.txt` lists these URLs, and HTML pages
  advertise them with a `text/markdown` alternate link.
- `Accept: text/markdown` rewrites a docs request to Markdown without redirecting.
  HTML preferences, quality weights, and ordinary browser requests are respected.
  API handlers, images, and Next.js assets are not negotiated.

Markdown reuses Fumadocs MDX's `includeProcessedMarkdown` and
`getText('processed')` through `getLLMText`, also used by `/llms-full.txt`.
It contains page content, not the rendered layout.

**Hosting:** `proxy.ts` sets `Vary: Accept` on both negotiated branches, and
Markdown responses retain it. Next.js 16.0.10 overwrites `Vary` on HTML page
responses. At a shared CDN, append `Accept` to the HTML response's existing
`Vary` values and ensure the cache distinguishes the representations (or bypass
caching for negotiated docs requests). Do not replace Next.js's existing RSC
`Vary` values. Check this on the deployed hostname; application-level headers
alone cannot fix the HTML response. No setting is needed for direct `.md` URLs.

Run the negotiation regression test with `bun test proxy.test.ts`.
