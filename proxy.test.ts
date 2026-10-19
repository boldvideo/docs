import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import proxy from "./proxy";

test("docs negotiate markdown without overriding an HTML preference", () => {
  for (const [accept, markdown] of [
    ["text/markdown", true],
    ["text/markdown, text/html", true],
    ["text/html, text/markdown", false],
    ["text/html;q=0.5, text/markdown;q=0.9", true],
    ["text/markdown;q=0.5, text/html;q=0.9", false],
    ["text/markdown;q=0, text/html", false],
    ["*/*", false],
    ["text/plain", false],
    ["", false],
  ] as const) {
    const response = proxy(
      new NextRequest("https://docs.boldvideo.com/guides/quickstart?test=1", {
        headers: { Accept: accept },
      }),
    );
    assert.equal(
      response.headers.get("x-middleware-rewrite"),
      markdown
        ? "https://docs.boldvideo.com/llms.mdx/guides/quickstart?test=1"
        : null,
      `Accept: ${accept}`,
    );
    assert.equal(response.headers.get("Vary"), "Accept");
    assert.equal(response.headers.get("Location"), null);
  }
});
