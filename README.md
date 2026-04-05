# Signal Studio

Signal Studio is a clean-room Next.js preview site for interactive web projects. It includes:

- a site-wide popup chatbot launcher
- a homepage with an embedded visual experiment
- a demo gallery for native and iframe-based projects
- local development, production preview, and static export scripts
- an optional Builder-ready homepage content layer with local fallback

## Quick Start

```bash
pnpm install
pnpm host:dev
```

## Scripts

```bash
pnpm host:dev
pnpm host:prod
pnpm host:static
```

`scripts/host-preview.sh` supports:

- `dev` for hot reload
- `prod` for a local production preview
- `static` for export to `out/`

Optional environment variables:

- `HOST`
- `PORT`
- `BASE_PATH`
- `STATIC_EXPORT`
- `BUILDER_PUBLIC_API_KEY`
- `BUILDER_HOME_MODEL`

## Routes

- `/` home page
- `/demos` demo index
- `/demos/signal-canvas` native visual demo
- `/demos/pulse-lab` iframe demo from `public/embedded/pulse-lab`

## Static Hosting

For GitHub Pages-style hosting:

```bash
BASE_PATH=/your-repo-name pnpm host:static
```

Publish the generated `out/` directory.

## Builder Homepage Content

The homepage now renders from a typed content contract in `lib/content/home-page.ts`.

- Without Builder env vars, the site uses local fallback content.
- With `BUILDER_PUBLIC_API_KEY` set, the app attempts to fetch the homepage model from Builder's Content API.
- If Builder content is missing or invalid, the page falls back to the local content defaults.

The initial Builder-friendly shape is intentionally narrow:

- `hero`
- `approach`
- `demos`

This keeps the current visual composition stable while making the homepage marketing content easier to map into visual editors.

## Agent Guidance

Before expanding the site, read:

- `AGENTS.md`
- `docs/website-guardrails.md`
- `docs/demo-integration.md`
