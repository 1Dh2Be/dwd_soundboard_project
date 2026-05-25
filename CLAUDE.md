# CLAUDE.md

This file gives Claude Code the context it needs when working in this repository.

## Project info

- **Course:** Dynamic Web Development (DWD)
- **School:** Odisee (Belgium)
- **Programme:** Applied Informatics, 1st year
- **Project:** Soundboard web app
- **Description:** A soundboard that lets users search for sound effects through the [Freesound.org](https://freesound.org) API, preview and play them, and save favourites to a personal dashboard. Favourites must persist across page reloads using `localStorage`.

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript (ES modules, async/await)
- [Biome](https://biomejs.dev) for linting and formatting
- External API: Freesound.org

## Project structure

```
.
├── index.html          # Single entry page
├── index.css           # All styles
├── index.js            # All application logic
├── img/                # Image assets
├── documentatie.docx   # Course documentation
├── biome.json          # Biome configuration
├── package.json
└── CLAUDE.md
```

## Requirements

- Search sound effects via the Freesound.org API.
- Preview and play sounds in the browser.
- Save favourites to a personal dashboard.
- Persist the dashboard in `localStorage` so favourites survive a page reload.
- All API calls use `fetch` with `async/await`.
- Layout must be responsive (mobile-first welcome, but at minimum it must work on phone, tablet, and desktop widths).

## Rules

### Allowed

- Vanilla HTML, CSS, and JavaScript only.
- Native browser APIs (`fetch`, `localStorage`, `Audio`, etc.).
- Biome for code style and linting.
- CSS custom properties, Flexbox, and Grid.

### Not allowed

- No frameworks (no React, Vue, Svelte, Angular, etc.).
- No CSS frameworks (no Bootstrap, Tailwind, Bulma, etc.).
- No JS libraries (no jQuery, Axios, Lodash, etc.).
- No build tools / bundlers beyond what Biome needs.
- No TypeScript (plain JS only).
- No inline `<script>` or inline styles in HTML — keep concerns separated across `index.html`, `index.css`, `index.js`.

### Conventions

- Use `fetch` with `async/await`, never `.then()` chains or `XMLHttpRequest`.
- Run `npm run check` before committing to apply Biome's formatter + linter.
- Keep file names lowercase (`index.html`, `index.css`, `index.js`).

## Useful commands

```bash
npm run lint     # Run Biome linter
npm run format   # Format files with Biome
npm run check    # Lint + format + apply safe fixes
```
