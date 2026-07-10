# Docs Review List

Open questions and decisions from the 2026-07-10 docs rewrite. Everything below shipped with a best-guess in the docs; each item needs a confirm-or-correct from the team.

## Security / hygiene (do these first)

1. **Revoke the API key created during research.** A key (`bold_live_aDuB…`) was created on the Grow test account to verify API behavior. Revoke it in Settings → Developer. The screenshot `public/images/admin/admin-api-key-created.png` shows it and is deliberately NOT referenced by any docs page; delete or retake it.
2. `.env` at repo root holds real login credentials and is untracked. Make sure it never gets committed (add `.env` to .gitignore; currently only `.env*.local` is ignored).

## Plan gating (verify wording and placement)

Decision taken: yes, we mark plan-gated features inline with a `<Callout title="Plan availability">`. Marked so far, based on boldvideo.com/pricing:

- Library-wide AI Coach / AMA → "Growth and Enterprise" (guides/ai-features, sdk/ai-methods)
- Same-voice translation → "Growth and Enterprise" (guides/transcripts-chapters)
- White-label portal → "Growth and Enterprise" (guides/portal)
- Engagement analytics → "Growth and Enterprise" (guides/dashboard)
- Session management → vague "check your plan" wording (sdk/session-management) because the pricing page doesn't state a tier. Confirm which plans include it.

Also confirm: do we want plan names in docs at all, or a neutral "on higher plans" phrasing that survives pricing changes? Current copy names the plans.

## Facts to confirm

3. **Webhooks** (api/webhooks.mdx): rewritten as "early access" with HMAC SHA-256 verification via the Developer-page signing secret. The old docs listed concrete events (`video.uploaded`, `video.processed`, …) and a `X-Bold-Signature: sha256=…` header that I could not verify anywhere; llms.txt explicitly excludes webhook routes from the public contract. Confirm: actual signature header name, event catalog, and whether webhook endpoint URLs are self-serve (I found no UI to register a URL) or configured by Bold staff.
4. **MCP** (mcp/index.mdx): marked as draft/coming-soon. No live endpoint found (app.boldvideo.io/mcp and mcp.boldvideo.io both 404). The tools/resources table and the config sample are informed guesses. Replace with real transport/URL/auth at launch.
5. **Portal domains**: Channel Settings copy says the hosted portal lives at `grow.boldvideo.io`, but embed/preview URLs use `grow.boldvideo.com` (which currently fails DNS/cert for the test tenant). Docs use `your-channel.boldvideo.com`. Confirm the canonical domain, and whether custom domains are supported (not documented yet).
6. **Enhanced embed `t` parameter**: the dialog has a "Start Time (seconds)" field; I documented the query param as `t` but did not capture the actual generated param name (start time was 0 in my test). Verify.
7. **Analytics SDK drift**: the bold-js README documents `trackEvent({type, videoId, timestamp})` and `trackPageView({path, referrer})`, but the shipped v1.24 types are `trackEvent(video, event)` and `trackPageView(title)`. Docs follow the shipped types. The README should be fixed upstream.
8. **Viewer memory endpoints** exist in the API (`/viewers/{id}/memory`) but not in the SDK; docs say "SDK doesn't wrap these yet". Confirm that's intended, not an omission on my side.
9. **Roles for team members**: the team list shows a Role column ("Member"). What roles exist (Admin/Member/…) and what can each do? Docs currently stay vague.
10. **Upload formats/limits**: docs say "all common video formats" with no size/length caps because I found no published limits. Add real numbers if we have them.
11. **AI answer volumes**: pricing page says Growth includes 2,000 answers/month, extra at €99/1,000. Docs don't mention volumes; should they?
12. **`videos.search` SDK method** hits `/search` (keyword+semantic). Confirmed in types, but confirm the description "keyword + semantic" is accurate for GET /api/v1/search.
13. **Push to YouTube**: documented as available per-video via Options. It was disabled (greyed out) on the test account; I assume it needs a connected YouTube account, but I found no connect UI under Integrations. Where does YouTube get connected?

## Upstream fixes (not docs)

14. **OpenAPI operationIds** contain ` (2)`-style suffixes (e.g. `ProjectSettingsController.settings (2)`), which produced ugly generated filenames. `scripts/fetch-openapi.ts` now normalizes them, but the backend should emit clean IDs.
15. **PUT+PATCH duplicate pages**: viewers/community updates ship as both PUT and PATCH, so the reference shows two near-identical pages each. Consider hiding one method in the spec or merging pages later.
16. **bold-js README** drift (see item 7); also its docs link points at `docs.boldvideo.io/docs/api`, which doesn't match this site's routes.

## Editorial decisions taken (flag if you disagree)

- Removed the fabricated **AI Coaching** guide (speech/visual feedback claims that don't match the product) and replaced it with guides/ai-features grounded in the real Ask Bold settings.
- Auth is documented as `Authorization: Bearer` only. The old `X-API-Key` examples were wrong (verified: 401).
- Response envelope documented as `{"data": …}`. The old `{"success": true, …}` example was wrong.
- Old embed docs claimed `app.boldvideo.io/embed/{id}` URLs and `autoplay/muted/loop/controls` params; replaced with the real `{portal}/e/{id}` embed and the params the dialog actually generates.
- Legacy AI aliases (`/ask`, `/coach`) are not documented (excluded from the public contract); the SDK page mentions its deprecated method names only in a migration note.
- `dangerously_all` and other private/internal routes are not documented anywhere.
- Docs site now serves `/llms.txt` (index) in addition to the existing `/llms-full.txt`.
