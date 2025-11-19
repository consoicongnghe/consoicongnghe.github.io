**Repository Overview**
- **Type**: Static GitHub Pages site (plain HTML/CSS/JS).
- **Purpose**: Author-maintained tutorials and blog posts in Vietnamese.
- **Top-level files**: `index.html`, `CNAME`, `rss.xml`, `sitemap.xml`.

**Key Directories**
- **`/posts/` and `/blog/`**: Content folders. Each article lives in its own folder with an `index.html` and usually an OG image (e.g. `/posts/iphone-qr-scan/index.html` and `/posts/iphone-qr-scan/iphone-qr-scan-og.jpg`).
- **`/assets/css/`**: Global stylesheet (`style.css`) used site-wide.
- **`/assets/js/`**: Site scripts (notably `main.js`) — lightweight DOM helpers.
- **`/assets/images/`**: Shared images and `og-image.jpg` used in meta tags.
- **`/assets/icons/`**: Favicons, `site.webmanifest`, and `browserconfig.xml` referenced from many pages.

**Big-picture architecture & conventions**
- The site is fully static: there is no build step, templating engine, or package manager. Pages duplicate the same `<head>` block — editing global metadata requires updating multiple files.
- Absolute-root URLs are used extensively (leading slash, e.g. `/assets/css/style.css`). Keep links root-relative to preserve GH Pages deployment behavior.
- Language/content: pages are `lang="vi"` and encoded UTF-8 — preserve diacritics and `charset="UTF-8"` in the head.
- Post listing pages (`/posts/index.html`, `/blog/`) are manually maintained: adding a post usually requires adding a new folder plus an entry in the listing file.

**Typical tasks & how to do them**
- Add a new post:
  - Create `posts/<slug>/index.html` with the same head structure (copy from an existing post).
  - Add an OG image at `posts/<slug>/<slug>-og.jpg` and reference it in the post's meta tags.
  - Add a summary block link to `posts/index.html` (these pages contain manual HTML for the post overview grid).
- Update global header/meta/footer:
  - There is no single template — search for the header block in `index.html` and representative pages and update them all.
  - Recommended: run a targeted search-and-replace for the specific elements (e.g., `G-ZLCH42TM0W` GA id or the site title), then spot-check important pages.
- Preview locally:
  - Quick: open files in a browser directly, or run a simple HTTP server from the repo root.
  - PowerShell example: `python -m http.server 8000` then visit `http://localhost:8000`.
  - Alternatively use the VS Code Live Server extension for editing feedback.
- Deploy/publishing:
  - Deployment is via GitHub Pages from this repository (root). Pushing to `main` publishes changes automatically.

**Project-specific patterns and gotchas**
- Head block repetition: edit carefully. Many pages embed Google Analytics (`gtag`) and structured data JSON-LD — do not accidentally break JSON quoting or `script` tags.
- File path separators: some files use backslashes in attributes (e.g., `\assets\icons\...`). Browsers tolerate this, but prefer forward slashes (`/`) when editing.
- Image sizing: posts often include large images plus `loading="lazy"` and explicit `width`/`height`. Preserve these for performance and layout stability.
- Link style: internal links consistently use leading `/`. Avoid relative links that assume a particular working directory when possible.
- Accessibility: headings and breadcrumb lists follow simple structures (e.g., `ul.breadcrumb`). Keep these patterns when adding pages.

**Files to inspect for examples**
- Root page: `index.html` (global head, nav, examples of shortcuts grid).
- Post listing: `posts/index.html` (how overview tiles are structured).
- Example post: `posts/iphone-qr-scan/index.html` (single-post structure and OG image naming).
- Styles/scripts: `assets/css/style.css`, `assets/js/main.js`.

**Instruction style for AI edits**
- When changing metadata or layout, edit a single representative file first and produce a small patch that updates other pages consistently.
- Prefer minimal, targeted diffs — keep the site’s hand-authored HTML style and avoid introducing a build system unless asked.
- Preserve Vietnamese text and `lang="vi"`. Use `UTF-8` encoding for any new files.

If anything here is unclear or you want additional rules (for example a standard PR message, automated script to sync head blocks, or a specific pattern for new posts), tell me which part to expand and I will update this file.
