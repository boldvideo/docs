# Docs Assets — Screenshots & Screencasts

Working list for the docs media. Draft screenshots were captured 2026-07-10 from the "Grow" test account (dark mode, 1280px viewport) via Playwright and live in `public/images/admin/`. They're good enough to ship as placeholders; replace with polished captures (consistent account, seeded demo data, light+dark variants if we want theme-aware images).

## Draft screenshots captured (replace with polished versions)

| File | Page(s) using it | Shows | Notes for polished retake |
|------|------------------|-------|---------------------------|
| `admin-dashboard.png` | guides/dashboard | Analytics dashboard | Test account has zero traffic — retake on an account with real plays |
| `admin-videos-library.png` | guides/managing-videos | Library w/ collections+tags sidebar | Seed collections & tags first (test account had none) |
| `admin-upload-menu.png` | guides/quickstart, uploading-videos | Upload dropdown (Computer/Drive/OneDrive) | Fine as-is |
| `admin-video-edit-details.png` | guides/quickstart, managing-videos | Video edit page, Details tab | Good subject (Boris Cherny episode); retake at consistent zoom |
| `admin-video-options-menu.png` | guides/managing-videos | Options menu open | Push to YouTube shows disabled here — retake with YouTube connected? |
| `admin-video-chapters.png` | guides/managing-videos | Chapters tab | Fine |
| `admin-video-intelligence.png` | guides/video-intelligence | Intelligence report panel | Great content; crop to the panel |
| `admin-transcript-editor.png` | guides/transcripts-chapters | Transcript editor w/ speakers | Rename speakers first (A/B/C → real names) for a nicer shot |
| `admin-embed-dialog.png` | guides/embedding | Embed dialog, standard | Preview iframe fails on test tenant (portal DNS) — retake on tenant with live portal |
| `admin-embed-enhanced.png` | guides/embedding | Enhanced embed w/ feature toggles | Same portal-preview caveat |
| `admin-playlists.png` | guides/collections-playlists | Playlists overview | Fine |
| `admin-playlist-edit.png` | guides/collections-playlists | Playlist editor | Fine |
| `admin-portal-settings.png` | guides/portal | Portal settings, all sections expanded (full-page) | Very tall — consider per-section crops |
| `admin-settings-channel.png` | guides/settings | Channel settings (full-page) | Consider cropping into sections |
| `admin-settings-ai.png` | guides/ai-features | AI Settings page | Fill in example values first for a richer shot |
| `admin-settings-video-types.png` | guides/video-intelligence | Video type templates | Fine |
| `admin-settings-developer.png` | guides/settings | Developer settings | Fine |
| `admin-api-key-created.png` | (deleted) | API key creation dialog | Deleted: it showed a live key (now flagged for revocation in REVIEW.md). Retake with a throwaway key and blur |
| `admin-team-members.png` | guides/team-viewers | Team members list | Fine |
| `admin-viewers.png` | guides/team-viewers | Viewers page (empty) | Retake with seeded viewers |
| `admin-cmdk-search.png` | (unused) | ⌘K palette | Could go in managing-videos |

## Screenshots still needed (no draft exists)

- **Viewer portal** — homepage, video page w/ AI chat, search results. Test tenant's portal (grow.boldvideo.com) is unreachable (DNS/cert) — capture from a healthy tenant or demo account.
- **Enhanced embed rendered** on a real page (marketing-quality shot for guides/embedding)
- **AI chat conversation** in the portal — question + cited answer with timestamp links
- **Challenge/verification email + device-limit UI** for session management (if we want visuals there)
- **Video type editor** — the "New Video Type" form (guides/video-intelligence)
- **CTA on a video** as viewers see it (guides/settings)
- **Zoom/Drive/Teams connect flows** (guides/integrations) — at least the connected state
- **Light-mode variants** of key screenshots if we want theme-aware images (`<ImageZoom>`/picture element)

## Screencasts (Loom/Tella) — suggested list, none exist yet

1. **Quickstart (2–3 min)** — upload → processing → review AI metadata → publish → share. The hero video; embed on guides/quickstart.
2. **Transcript editing (90 s)** — fix a term, rename speakers, save; show captions updating.
3. **Portal setup (2 min)** — branding, colors, featured playlists, go live.
4. **Enhanced embed (60 s)** — configure toggles, paste into a page, show AI chat working.
5. **AI tuning (2 min)** — org profile + personality → before/after answer quality.
6. **Build a portal with create-bold-app (3 min)** — for the SDK section.

Suggested convention: host on Bold itself (dogfooding) and embed with the enhanced player.
