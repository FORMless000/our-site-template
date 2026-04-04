# Demo Integration Rules

Use these rules when adding demos or embedded projects.

## Native demos

- Use native routes for projects that should share the site shell and styling.
- Keep heavy rendering client-side when visual code does not need server output.
- Prefer reusable visual components so the homepage can feature them too.

## Iframe demos

- Put standalone exported projects under `public/embedded/<slug>`.
- Use iframe routes when an existing app is better kept isolated.
- Keep iframe permissions minimal and expand them only when needed.

## Hosting compatibility

- New demos must work with local dev, production preview, and static export unless explicitly documented otherwise.
- Respect `BASE_PATH` when linking to local static assets.
- Avoid assumptions that only work on root-path deployments.

## Documentation

- Add each new demo to the registry with a short summary, highlights, and notes.
- If a demo has special build or runtime needs, document them beside the integration.
