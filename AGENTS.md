# Axenide.github.io Development Guide

**Updated:** 2026-09-24
**Branch:** dev

## OVERVIEW
Personal website and blog built with **Zola** (0.23+, Tera v2 components). Formerly used the **Axetrine** theme (a Codeberg submodule forked from Ametrine); the theme has been **ported into this repo** — there are no theme overrides anymore, everything is edited directly.

## STRUCTURE
```
.
├── config.toml          # Zola config (no `theme` key; self-contained)
├── content/             # Markdown content (blog, projects, nanolog, etc.)
├── templates/
│   ├── components.html  # Global Tera component library (icon, alert, image, ...)
│   ├── partials/        # head, header, footer, sidebar, accent/mono color, ...
│   └── shortcodes/      # Tera shortcodes
├── sass/                # Site stylesheet source (see map below)
├── static/              # Assets (images, fonts, js, icons/, tile, piano, xp)
├── i18n/                # UI translations (en, es, de, ru, zh-Hans, ...)
├── data/                # accent_presets.toml
├── icons/               # Phosphor (icons/phosphor/) + simple icon SVGs, used via load_data()
└── public/              # Built output (gitignored)
```

## SCSS MAP
Two compiled stylesheets, loaded in this order (`style.css` first, then `custom.css`):

- **`sass/style.scss`** → `style.css`: the base theme (Ametrine lineage).
  - `base/` root tokens, reset, typography · `layout/` header, sidebar, footer, grid
  - `components/` one file per component (`_buttons`, `_input`, `_card`, `_icon`, ...)
  - `home/` homepage widgets · `mods/` opt-in variants (all commented out)
  - `base/_fonts.scss` — @font-face (Roboto Condensed, Pangolin), `@use`d near the end
  - `base/_tokens.scss` — the palette, `@use`d LAST so it always wins. Dark + light blocks derive everything from a single OKLCH input (`--mono` / `--mono-light`) injected by `templates/partials/mono_color.html`. This is the single source of truth: change values here, not in components. Because the palette ships inside `style.css`, there is **no separate fallback palette**: `style.css` alone renders the official look.
  - Section styles (`badges/`, `calendar/`, `coffee/`, `commissions/`, `design/`, `nanolog/`, `swag/`) compile separately and load per-page via front matter `styles`
- **`sass/custom.scss`** → `custom.css`: the site layer. Entry only — it `@use`s:
  - `custom/_components.scss` — `@use` list of site-specific component styles (retro-avatar, arrow-note, home widgets, fancy-list, ...)
  - `custom/_pages.scss` — page-scoped CSS (carousel, lightbox, social icons, hero, github grid, sans, banner)

Note: `custom/_overrides.scss` was removed (2026-09-23): the whole look lives in the base theme files now (components/layout/base edit their own rules; no selector wars). Do not reintroduce an overrides file — edit the component or its tokens instead.

Note: `custom/_tokens.scss` and `custom/_fonts.scss` moved into `base/` (2026-09-24) so the palette and fonts travel with `style.css` — a missing/failed `custom.css` can no longer expose the old Ametrine default palette. Manual `html[data-theme]` variable blocks live in `base/_root.scss` (they emit only the base-only tokens; `_tokens.scss` overrides the colors).

Rules of thumb:
- Do **not** re-add `@import` (deprecated); use `@use` with paths relative to the file.
- Do **not** re-add a universal `border-radius: 0 !important`; squareness comes from `--rounded-corner: 0` in `base/_tokens.scss`.
- Do **not** import `custom.scss` from `style.scss` — that double-compiles every custom rule (it happened; it was removed).

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add blog post | `content/blog/` | Create folder with `index.md` |
| Add project | `content/projects/` | Same pattern |
| Add/edit a component (Tera) | `templates/components.html` | Global components: `icon`, `alert`, `image`, `styled_button`, `online`, ... |
| Restyle a component (CSS) | `sass/components/` (base) or `sass/custom/` (site layer) | Prefer editing the base component if the change is universal |
| Change palette | `sass/base/_tokens.scss` + `config.toml` (`mono`, `mono_light`, `[extra.semantic.*]`) | Tokens flow via `templates/partials/mono_color.html` → inline `<html style>` |
| Add an icon | drop SVG in `icons/phosphor/` | Consumed by the `icon` component (`{{< icon name="..." />}}`); supports `size` and `class` params |
| Config | `config.toml` | Zola 0.23 does **not** merge theme config; everything the site needs is here |

## BUILD COMMANDS
```bash
zola serve      # Dev server (localhost:1111)
zola build      # Production build
zola check      # Validate links
```

### Hot reload caveats (Zola 0.23)
- **Content & template** changes (`.md`, `templates/**`) — auto-reload, no action needed.
- **SCSS** changes (`sass/**`) — auto-recompile + reload.
- **`config.toml` changes** — Zola logs `Config changed. The browser needs to be refreshed` but the inline `--mono` / `--mono-light` / `[extra.semantic.*]` values emitted by `templates/partials/mono_color.html` do **not** re-render until `zola serve` is restarted. After editing `config.toml`, run `Ctrl+C` and `zola serve` again.

## CONVENTIONS (THIS PROJECT)
- **Front matter**: TOML (`+++`)
- **Localization**: EN default, ES via `.es.md` suffix
- **Indentation**: 2 spaces in the site layer (`sass/custom/`, root templates); base theme files keep tabs
- **CSS classes**: kebab-case
- **Commits**: conventional (`feat:`, `fix:`, etc.)

## ANTI-PATTERNS
- **NEVER** reintroduce selector wars against the base theme — if a component needs to look different, edit the component or its tokens
- **NEVER** commit secrets or API keys
- **DO NOT** push to `main` branch → deploys happen on push to the branch configured in Cloudflare Pages
- **DO NOT** add new `@import` in Sass or nest `custom` inside `style.scss` (see SCSS MAP)

## SUBMODULES
- `static/tile` → https://github.com/Axenide/tile.git
- `static/piano` → https://github.com/Axenide/piano
- `static/xp` → https://github.com/Axenide/XP
- `themes/axetrine` was removed (2026-09-22): its content lives in this repo now. The Codeberg repo (https://codeberg.org/Axenide/Axetrine) remains as an archive.

## CI/CD
- **Platform**: Cloudflare Pages (configured in the Cloudflare dashboard, no in-repo workflow)
- **Trigger**: Push to the production branch configured in Cloudflare (check dashboard; `dev` is the working branch)
- **Note**: The old GitHub Actions workflow (`.github/workflows/zola.yml`, shalzz/zola-deploy-action → `main` branch) was removed in `a92470f` (Jan 2026). GitHub Actions does nothing here anymore.
- **Note**: No submodule fetch is needed for `themes/` anymore; `static/*` submodules still are.

## DESIGN DECISIONS (for future reference)

### Border Radius
**Current state (2026-09-22):** Square corners via tokens only. The old universal `border-radius: 0 !important` nuke was removed; `--rounded-corner: 0` and `--rounded-corner-small: 0` in `sass/base/_tokens.scss` are the single switch.

**To enable rounded corners:** change those two tokens to `0.75rem` / `0.5rem`. Most elements follow. A few components keep hardcoded pill/circle radii by design (switches, radios, `.big` buttons, range thumbs) — they will become round when the tokens change. Elements forced square in CSS regardless of tokens: tile embeds, retro avatar, game items.

### Component gallery
The upstream Ametrine demo page was used as a visual reference during the 2026-09 refactor (copy `themes/axetrine/content/demo/` existed then; the theme dir is gone now — the demo was temporary per decision, re-add by hand if ever needed).

## NOTES
- `content/nanolog/_index.md` (and `.es.md`) reference `template = "ln_list.html"`, `styles = ["ln/style.css"]`, `scripts = ["ln/script.js"]` — none of those exist (pre-existing bug; the section renders with fallbacks). Fix the front matter paths if nanolog styling looks off.
- `zola check` reports a few unreachable external links in `content/projects/ax-shell/` (ffpy.org, hyprland.org) — network/bot-blocking, verify manually.
- Base theme has an unfinished `skeuomorphic` mod (commented out, ignore).
