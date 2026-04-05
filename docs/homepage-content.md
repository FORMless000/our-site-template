# Homepage Content Guide

This document explains how to author [`content/homepage.toml`](/Users/accessair/Desktop/Workspaces/sites/our-site-template/content/homepage.toml).

The homepage is generated entirely from TOML. To add, remove, reorder, or retune homepage content, edit the TOML file instead of changing React components.

## How It Works

- Source of truth: [`content/homepage.toml`](/Users/accessair/Desktop/Workspaces/sites/our-site-template/content/homepage.toml)
- Loader and validation: [`lib/content/get-homepage-document.ts`](/Users/accessair/Desktop/Workspaces/sites/our-site-template/lib/content/get-homepage-document.ts#L1)
- Runtime types: [`lib/content/homepage-document.ts`](/Users/accessair/Desktop/Workspaces/sites/our-site-template/lib/content/homepage-document.ts#L1)
- Project rendering: [`components/projects/project-surface.tsx`](/Users/accessair/Desktop/Workspaces/sites/our-site-template/components/projects/project-surface.tsx#L1)

Blocks render from top to bottom in the order they appear in `[[blocks]]`.

## Top-Level Shape

Required top-level fields:

- `title`
  - Required string.
- `[[blocks]]`
  - Required array.
  - Must contain at least one block.

Example:

```toml
title = "Signal Studio Homepage"

[[blocks]]
type = "title_display"
id = "opening"
title = "Interactive systems, framed clearly."
```

## Supported Block Types

Only these block types are allowed:

- `title_display`
- `project_demo`
- `textual_gateway_group`
- `graphical_gateway_group`

Any other `type` value fails validation.

## Shared Rules

Every block must have:

- `type`
- `id`

`id` should be unique. It can also be used as an anchor target for links such as `href = "#project-paths"`.

Allowed link formats:

- `/internal/path`
- `#hash-link`
- `https://example.com`
- `http://example.com`
- `mailto:name@example.com`
- `tel:+15555555555`

Any other link prefix fails validation.

## Shared Image Underlay Model

Underlay images are reusable and support the same alpha/gradient shape for sections and cards.
They are blended into the actual host surface color rather than faded into a separate dark overlay.

Base image fields:

- `src`
  - Required string.
- `alt`
  - Optional string.
  - Use `""` when decorative.
- `decorative`
  - Optional boolean.
  - Defaults to `true`.

If `decorative = false`, `alt` must be non-empty.

Overlay fields live under `[...image_underlay.overlay]`:

- `top_opacity`
  - Number between `0` and `1`
- `mid_opacity`
  - Number between `0` and `1`
- `bottom_opacity`
  - Number between `0` and `1`
- `top_stop`
  - Number between `0` and `100`
- `mid_stop`
  - Number between `0` and `100`
- `bottom_stop`
  - Number between `0` and `100`

Stops are vertical percentages from top to bottom of the section/card.

Default intent:

- title section: about `0.5 -> 0.24 -> 0`
- textual cards: about `0.1 -> 0.15 -> 0`

Those values represent how visible the image remains across the surface.
The renderer blends the image into the actual host background color:

- title sections blend into the section/page background
- textual cards blend into the panel/card background

Example:

```toml
[blocks.image_underlay]
src = "/homepage/title-underlay.svg"
alt = ""
decorative = true

[blocks.image_underlay.overlay]
top_opacity = 0.5
mid_opacity = 0.24
bottom_opacity = 0
top_stop = 0
mid_stop = 52
bottom_stop = 100
```

Recommended asset location:

- `public/homepage/...`

Then reference them as:

```toml
src = "/homepage/example.svg"
```

Remote images are also allowed.

## `title_display`

Use this for the background-led opening section or any large text-led section.

Fields:

- `type = "title_display"`
- `id`
  - Required string.
- `kicker`
  - Optional short label.
- `title`
  - Required main heading.
- `subtitle`
  - Optional supporting line.
- `body`
  - Optional longer paragraph.
- `content_align`
  - Optional.
  - Allowed values:
    - `left`
    - `center`
    - `right`
  - Defaults to `center`.
- `image_underlay`
  - Optional section background underlay using the shared underlay model.
- `[[blocks.actions]]`
  - Optional CTA row.

Action fields:

- `label`
  - Required string.
- `href`
  - Required link.
- `style`
  - Optional.
  - Allowed values:
    - `primary`
    - `secondary`
  - Defaults to `primary`.

Example:

```toml
[[blocks]]
type = "title_display"
id = "opening"
kicker = "Interactive studio"
title = "Interactive systems, framed clearly."
subtitle = "A compact launch page for live demos, project pathways, and visual entry points."
body = "Optional longer explanation goes here."
content_align = "center"

[blocks.image_underlay]
src = "/homepage/title-underlay.svg"
alt = ""
decorative = true

[blocks.image_underlay.overlay]
top_opacity = 0.5
mid_opacity = 0.24
bottom_opacity = 0
top_stop = 0
mid_stop = 52
bottom_stop = 100

[[blocks.actions]]
label = "View featured project"
href = "#featured-project"
style = "primary"
```

Guidance:

- Keep titles short and strong.
- Default to `content_align = "center"` unless the composition clearly calls for side alignment.
- Use underlays for atmosphere, not essential readable detail.
- The image fades into the real section background color, not an arbitrary dark mask.

## `project_demo`

Use this for a featured live project with demo media on one side and text on the other.

Fields:

- `type = "project_demo"`
- `id`
  - Required string.
- `kicker`
  - Optional short label.
- `title`
  - Required heading.
- `body`
  - Required description.
- `media_side`
  - Optional.
  - Allowed values:
    - `left`
    - `right`
  - Defaults to `left`.
- `project_kind`
  - Required.
  - Allowed values:
    - `native`
    - `iframe`
- `go_to_href`
  - Required destination link.
- `go_to_label`
  - Optional link text.
  - Defaults to `Learn More`.

What this block does automatically:

- renders the live project inline
- adds a fullscreen icon in the project chrome
- enlarges the same running project instance instead of creating a second one
- renders a text-style `Learn More >` link

### Native project fields

If `project_kind = "native"`, use:

- `project_key`
  - Required.
  - Supported values:
    - `signal_canvas`
    - `counter`

Example:

```toml
[[blocks]]
type = "project_demo"
id = "counter-project"
kicker = "Stateful demo"
title = "Counter"
body = "A minimal native demo that increments every second."
media_side = "right"
project_kind = "native"
project_key = "counter"
go_to_href = "/demos/counter"
go_to_label = "Learn More"
```

### Iframe project fields

If `project_kind = "iframe"`, use:

- `src`
  - Required iframe source path or URL.
- `iframe_title`
  - Optional accessible title.
  - Defaults to the block title if omitted.

Example:

```toml
[[blocks]]
type = "project_demo"
id = "pulse-feature"
kicker = "Embedded app"
title = "Pulse Lab"
body = "A self-contained iframe demo for older exported tools."
media_side = "left"
project_kind = "iframe"
src = "/embedded/pulse-lab/index.html"
iframe_title = "Pulse Lab embedded demo"
go_to_href = "/demos/pulse-lab"
```

When code changes are needed:

- adding a new native `project_key`
- changing how fullscreen hosting behaves
- changing the toolbar or text-link treatment

## Shared Gateway Layout Controls

Both gateway group types support a shared layout table:

```toml
[blocks.layout]
desktop_columns = 3
tablet_columns = 2
mobile_columns = 1
aspect_ratio = "4:3"
```

Fields:

- `desktop_columns`
  - Optional positive integer.
  - Default `3`.
- `tablet_columns`
  - Optional positive integer.
  - Default `2`.
- `mobile_columns`
  - Optional positive integer.
  - Default `1`.
- `aspect_ratio`
  - Optional ratio string like `"4:3"` or `"16:10"`.
  - Default `"4:3"`.

The aspect ratio controls card height proportionally.

## `textual_gateway_group`

Use this for text-led cards with optional underlays.

Fields:

- `type = "textual_gateway_group"`
- `id`
  - Required string.
- `kicker`
  - Optional section label.
- `title`
  - Required section heading.
- `[blocks.layout]`
  - Optional shared gateway layout table.
- `[[blocks.cards]]`
  - Required array.
  - Must contain at least one card.

Card fields:

- `eyebrow`
  - Optional short label.
- `title`
  - Required card title.
- `body`
  - Required card description.
- `href`
  - Required link.
- `image_underlay`
  - Optional shared underlay model.

Example:

```toml
[[blocks]]
type = "textual_gateway_group"
id = "project-paths"
kicker = "Project pathways"
title = "Choose a deeper way into the studio."

[blocks.layout]
desktop_columns = 3
tablet_columns = 2
mobile_columns = 1
aspect_ratio = "5:4"

[[blocks.cards]]
eyebrow = "Embedded web app"
title = "Pulse Lab"
body = "A sandboxed iframe route for self-contained experiments and older exported tools."
href = "/demos/pulse-lab"

[blocks.cards.image_underlay]
src = "/homepage/pulse-card.svg"
alt = ""
decorative = true

[blocks.cards.image_underlay.overlay]
top_opacity = 0.1
mid_opacity = 0.15
bottom_opacity = 0
top_stop = 0
mid_stop = 50
bottom_stop = 100
```

Textual card underlays use the same overlay schema as title sections, but they blend into the card/panel background color instead of the section background.

## `graphical_gateway_group`

Use this for image-first cards where the whole card acts as the link.

Fields:

- `type = "graphical_gateway_group"`
- `id`
  - Required string.
- `kicker`
  - Optional section label.
- `title`
  - Required section heading.
- `[blocks.layout]`
  - Optional shared gateway layout table.
- `[[blocks.cards]]`
  - Required array.
  - Must contain at least one card.

Card fields:

- `image_src`
  - Required image path or URL.
- `image_alt`
  - Optional but recommended.
- `href`
  - Required link.
- `aria_label`
  - Optional but recommended.

Accessibility rule:

- at least one of `image_alt` or `aria_label` must be non-empty

Example:

```toml
[[blocks]]
type = "graphical_gateway_group"
id = "quick-links"
kicker = "Quick gateways"
title = "Jump directly from image to destination."

[blocks.layout]
desktop_columns = 2
tablet_columns = 2
mobile_columns = 1
aspect_ratio = "16:10"

[[blocks.cards]]
image_src = "/homepage/gateway-canvas.svg"
image_alt = "Abstract signal rings and field lines previewing the Signal Canvas project"
href = "/demos/signal-canvas"
aria_label = "Open the Signal Canvas project page"
```

## Common Editing Tasks

### Reorder blocks

Move a full `[[blocks]]` section up or down in the file.

### Remove a block

Delete the whole block, including nested tables such as:

- `[blocks.image_underlay]`
- `[blocks.image_underlay.overlay]`
- `[[blocks.actions]]`
- `[blocks.layout]`
- `[[blocks.cards]]`
- `[blocks.cards.image_underlay]`
- `[blocks.cards.image_underlay.overlay]`

### Add another block of an existing type

Copy an existing block of the same type, then change:

- `id`
- copy text
- links
- images
- layout values if needed

### Link to another homepage section

```toml
href = "#quick-links"
```

The target block should use:

```toml
id = "quick-links"
```

## What TOML Can Do Without Code Changes

Editing TOML is enough for:

- changing text
- reordering blocks
- adding more blocks of existing types
- changing title alignment
- tuning shared underlay alpha/gradient values
- changing gateway grid columns
- changing gateway card aspect ratios
- adding iframe-based project demos
- switching which supported native project is featured

## What Still Requires Code Changes

- adding a new block type
- adding a new native `project_key`
- changing the fullscreen/state-preservation implementation
- changing the visual treatment beyond supported TOML fields
- introducing underlays to new component families not yet wired up

## Common Validation Failures

The build fails fast if TOML is invalid.

Typical causes:

- missing required `type`, `id`, `title`, or `href`
- unsupported `type`
- unsupported `project_kind`
- unsupported native `project_key`
- invalid link format
- non-positive column counts
- invalid `aspect_ratio` format
- missing `alt` for non-decorative underlays
- missing both `image_alt` and `aria_label` on graphical cards
- opacity outside `0..1`
- stop values outside `0..100`

Error messages usually point to a specific field path such as:

- `blocks[1].project_kind`
- `blocks[2].layout.aspect_ratio`
- `blocks[2].cards[0].image_underlay.overlay.mid_opacity`

## Recommended Workflow

1. Edit [`content/homepage.toml`](/Users/accessair/Desktop/Workspaces/sites/our-site-template/content/homepage.toml).
2. Add or update artwork under [`public/homepage`](/Users/accessair/Desktop/Workspaces/sites/our-site-template/public/homepage).
3. Run `pnpm build`.
4. Run `pnpm build:static` if you changed routes, assets, links, or embedded project references.
