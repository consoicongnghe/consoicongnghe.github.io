# GitHub Copilot Instructions — repo-specific guidance

This repository is a plain static GitHub Pages site (HTML/CSS/JS). The instructions below focus on actionable, repository-specific behaviors for an AI coding agent.

## Quick overview
- Repo type: static HTML/CSS/JS site deployed via GitHub Pages from the repository root.
- Encoding/language: pages use `lang="vi"` and UTF-8 encoding. Preserve diacritics and `charset="UTF-8"` in any new/edited pages.

## Key locations (inspect these files first)
- `index.html` — root page and canonical head example.
- `posts/`, `blog/` — content folders with one folder per article containing `index.html` and an OG image.
- `posts/index.html`, `blog/index.html` — manual listing pages; adding a post requires editing these.
- `assets/css/style.css`, `assets/js/main.js` — global styles and small scripts.
- `assets/icons/site.webmanifest`, `assets/icons/browserconfig.xml` — icon/manifest resources referenced site-wide.

## Why the layout looks like this
- No build step or templating engine; shared fragments (head/footer) are duplicated across pages by design.
- Root-relative paths (leading `/`) are used consistently so pages resolve correctly when published to GitHub Pages.

## Common tasks — exact steps & examples
- Add a new post:
  1. Create `posts/<slug>/index.html` by copying an existing post folder.
  2. Add the OG image at `posts/<slug>/<slug>-og.jpg` and set corresponding meta tags in the post head.
  3. Add a summary tile entry to `posts/index.html` (and `blog/index.html` if applicable) — these are hand-edited HTML blocks.

- Update global metadata (GA id, site title, structured data):
  1. Edit one representative file such as `index.html`.
  2. Use a targeted search-and-replace across `.html` files (see PowerShell examples below).

- Local preview:
  - From the repository root run:
    ```powershell
    python -m http.server 8000
    ```
    Then open `http://localhost:8000`.

## Useful PowerShell snippets (copy/paste)
- Preview which files contain a string:
  ```powershell
  Select-String -Path .\\**\\*.html -Pattern 'G-ZLCH42TM0W' -List
  ```
- Safe find-and-replace across HTML files (test/backup first):
  ```powershell
  Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    (Get-Content $_.FullName) -replace 'OLD_TEXT','NEW_TEXT' | Set-Content $_.FullName
  }
  ```

## Project-specific gotchas
- JSON-LD and `gtag` blocks are sensitive to quoting; do not break script contents when editing.
- Some HTML uses backslashes in paths (e.g., `\\assets\\icons\\...`). Prefer forward slashes (`/`) when fixing paths.
- Keep `loading="lazy"` and explicit `width`/`height` attributes on large images to preserve layout and performance.

## Integration points
- Publishing: GitHub Pages (push to `main` publishes the site).
- External services: Google Analytics and other embedded scripts — treat them as external and avoid modifying unless requested.

## Editing policy for AI agents
- Make minimal, focused changes. Edit a representative file then apply matching changes across the set.
- Avoid introducing build tools, package managers, or large refactors without human approval.
- Commit messages: use concise patterns such as `Add post: <slug>` or `Update: GA id`.

If you want a helper script to synchronize head blocks across pages or a sample PR for adding a post, say which automation you prefer and I will add it.
