# Axenide.github.io Development Guide

This repository hosts the personal website and blog of Axenide, built with **Zola** and the **Ametrine** theme.

## 1. Build & Test Commands

### Prerequisites
- **Zola**: Ensure Zola is installed. (e.g., `sudo snap install --edge zola` or via package manager).
- **Sass**: Zola handles Sass compilation, but the project uses `.scss` files.

### Commands
- **Serve (Dev):**
  ```bash
  zola serve
  ```
  *   Runs a local server (usually localhost:1111).
  *   Watches for file changes.
  *   Recompiles Sass on the fly.

- **Build (Prod):**
  ```bash
  zola build
  ```
  *   Generates static files in the `public/` directory.
  *   **Note:** CI/CD handles deployment to the `main` branch (via `gh-pages` mechanism). The source code is in the `dev` branch.

- **Check:**
  ```bash
  zola check
  ```
  *   Validates internal links and configuration.
  *   Run this before committing changes to structure or links.

### CI/CD Pipeline
- **Workflow:** `.github/workflows/zola.yml`
- **Action:** `shalzz/zola-deploy-action`
- **Trigger:** Push to `dev` branch.
- **Output:** Deploys generated site to `main` branch.

---

## 2. Code Style & Conventions

### Directory Structure
- **`content/`**: Markdown content (pages, blog posts).
- **`sass/`**: Custom styles overrides (`custom.scss`).
- **`templates/`**: Custom HTML templates and shortcodes.
- **`static/`**: Static assets (images, fonts).
- **`themes/`**: Submodule for the `ametrine` theme.

### Markdown (Content)
- **Front Matter:** Use **TOML** format (`+++`).
  ```toml
  +++
  title = "My Post Title"
  date = 2025-01-01
  [taxonomies]
  tags = ["general", "dev"]
  +++
  ```
- **Localization:**
  *   English is default: `filename.md`.
  *   Spanish: `filename.es.md`.
  *   Ensure corresponding front matter keys exist in both languages.
- **Images:**
  *   Collocate images with content if specific to a post (e.g., `content/blog/hello/image.png`).
  *   Use relative paths in Markdown: `![Alt](image.png)`.
  *   Global assets go in `static/images/`.

### Templates (Tera)
- **Syntax:** Tera (Jinja2-like).
- **Extension:** `.html`.
- **Shortcodes:** Located in `templates/shortcodes/`.
  *   Example: `{{ retro_text(text="HELLO") }}`
- **Best Practices:**
  *   Extend base templates from the theme where possible.
  *   Use `{% block content %}` for overrides.
  *   Avoid hardcoded strings; use `config.toml` variables or specific data files if needed.

### CSS / Sass
- **File:** `sass/custom.scss`.
- **Variables:** Uses CSS variables defined in `:root` (e.g., `--accent-color`).
- **Nesting:** SCSS nesting is encouraged for component-specific styles.
- **Formatting:** 2 spaces indentation.
- **Naming:** Kebab-case for classes (e.g., `.retro-word`, `.lightbox-overlay`).

### JavaScript
- **Usage:** Minimal usage. mostly for UI interactions (carousel, lightbox).
- **Style:** Vanilla JS, no build step required for JS currently.
- **Formatting:** 2 spaces indentation, semicolons.

---

## 3. Workflow Guidelines

### Git Workflow
- **Main Branch:** `dev` (This is where you commit code).
- **Deploy Branch:** `main` (Do NOT commit here manually; CI handles it).
- **Commits:**
  *   Use conventional commit messages (e.g., `feat: add new blog post`, `fix: css alignment`).
  *   Keep commits atomic.

### Adding New Content
1.  Create a folder in `content/blog/` or `content/projects/`.
2.  Add `index.md` (and `index.es.md`).
3.  Fill required front matter (`title`, `date`, `taxonomies`).
4.  Write content.

### Modifying Theme
- Prefer overriding templates in the root `templates/` directory rather than modifying `themes/ametrine/` directly, unless you are contributing upstream to the theme.

### Safety
- **Secrets:** Never commit API keys or private tokens.
- **Paths:** Always use absolute paths when using tool agents (e.g., `/home/adriano/Repos/Axenide/axenide.github.io/...`).
- **Submodules:** Never modify the `themes/ametrine/` submodule directly.

### References
 **Ametrine Theme Creator (Daudix):** https://github.com/daudix/daudix.one