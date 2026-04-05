# Signal Studio

Signal Studio is a clean-room Next.js preview site for interactive web projects. It includes:

- a site-wide popup chatbot launcher
- a TOML-driven homepage built from reusable landing blocks
- a demo gallery for native and iframe-based projects
- local development, production preview, and static export scripts

## Quick Start

```bash
pnpm install
pnpm host:dev
```

If `pnpm` is not installed globally, the hosting wrapper falls back to `corepack pnpm`.

## Dependencies

Runtime dependencies:

- `lucide-react`
- `next`
- `react`
- `react-dom`
- `smol-toml`

Development dependencies:

- `@types/node`
- `@types/react`
- `@types/react-dom`
- `typescript`

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

The wrapper also auto-installs dependencies with `pnpm install --frozen-lockfile` or `corepack pnpm install --frozen-lockfile` when `node_modules/` is missing.

Optional environment variables:

- `HOST`
- `PORT`
- `BASE_PATH`
- `STATIC_EXPORT`

## Routes

- `/` home page
- `/demos` demo index
- `/demos/counter` native state-persistence demo
- `/demos/signal-canvas` native visual demo
- `/demos/pulse-lab` iframe demo from `public/embedded/pulse-lab`

## Static Hosting

For GitHub Pages-style hosting:

```bash
BASE_PATH=/your-repo-name pnpm host:static
```

Publish the generated `out/` directory.

## Homepage Content

The homepage now renders from `content/homepage.toml`.

- Blocks are ordered top-to-bottom by the `[[blocks]]` array in TOML.
- Supported block types are:
  - `title_display`
  - `project_demo`
  - `textual_gateway_group`
  - `graphical_gateway_group`
- Title sections support background underlays, shared gradient overlays, and configurable horizontal alignment.
- Gateway groups support TOML-controlled columns and aspect ratios.
- Native `project_demo` blocks currently support `signal_canvas` and `counter`.
- Invalid or incomplete homepage content fails fast during build with a clear loader error.

Homepage artwork should live under `public/homepage/` and be referenced from TOML using site-relative paths such as `/homepage/title-underlay.svg`.

Full authoring guide:

- [`docs/homepage-content.md`](/Users/accessair/Desktop/Workspaces/sites/our-site-template/docs/homepage-content.md)

## Agent Guidance

Before expanding the site, read:

- `AGENTS.md`
- `docs/website-guardrails.md`
- `docs/demo-integration.md`
