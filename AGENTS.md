# Axenide.github.io Development Guide

**Generated:** 2026-03-26
**Commit:** ecd2673
**Branch:** dev

## OVERVIEW
Personal website and blog built with **Zola** static site generator and **Axetrine** theme (Ametrine fork).

## STRUCTURE
```
.
├── config.toml          # Zola config
├── content/             # Markdown content (blog, projects, nanolog, etc.)
├── templates/           # Custom Tera templates & shortcodes
├── themes/axetrine/    # Theme submodule (Codeberg)
├── static/             # Assets (images, fonts, js)
├── i18n/               # Spanish translations
└── public/             # Built output (gitignored)
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add blog post | `content/blog/` | Create folder with `index.md` |
| Add project | `content/projects/` | Same pattern |
| Add shortcode | `templates/shortcodes/` | Tera templates |
| Custom styles | Override in Axetrine | Can modify submodule |
| Config | `config.toml` | Zola settings |

## BUILD COMMANDS
```bash
zola serve      # Dev server (localhost:1111)
zola build      # Production build
zola check      # Validate links
```

## CONVENTIONS (THIS PROJECT)
- **Front matter**: TOML (`+++`)
- **Localization**: EN default, ES via `.es.md` suffix
- **Indentation**: 2 spaces
- **CSS classes**: kebab-case
- **Commits**: conventional (`feat:`, `fix:`, etc.)

## ANTI-PATTERNS
- **NEVER** modify `themes/axetrine/` directly → override in root `templates/`
- **NEVER** commit secrets or API keys
- **DO NOT** push to `main` branch → CI/CD auto-deploys from `dev`

## SUBMODULES
- `themes/axetrine` → https://codeberg.org/Axenide/Axetrine
- Has independent remote → can push changes directly from submodule dir

## CI/CD
- **Workflow**: `.github/workflows/zola.yml`
- **Trigger**: Push to `dev` branch
- **Action**: shalzz/zola-deploy-action
- **Output**: Deploys to `main` branch (gh-pages)

## DESIGN DECISIONS (for future reference)

### Border Radius
**Current state (2026-05-20):** Everything is square (`border-radius: 0`).

**To switch to rounded corners:**
1. In `themes/axetrine/sass/custom.scss`, change:
   - `--rounded-corner: 0` → `--rounded-corner: 0.75rem`
   - `--rounded-corner-small: 0` → `--rounded-corner-small: 0.5rem`
2. Comment out the universal rule at the end of the file:
   ```scss
   /* *,
   *::before,
   *::after {
     border-radius: 0 !important;
   } */
   ```

**Note:** With rounded corners enabled, most elements (articles, cards, buttons, inputs, tags) will have soft 0.75rem corners. Only a few hardcoded elements (social icons, tile embeds, shy button, retro avatar, game items) remain square by design.

## NOTES
- Missing `sass/custom.scss` at root (AGENTS.md outdated on this)
- Theme has unfinished `skeuomorphic` mod (commented out, ignore)
