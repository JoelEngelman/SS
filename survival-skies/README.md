# Survival Skies — Modular `index.html`

This folder contains the Survival Skies `index.html` split into smaller files by responsibility.

The source is generated from `JoelEngelman/Survival-Skies` so the original game file is preserved there.

Structure:

- `document/` — HTML document pieces
- `css/` — stylesheet pieces
- `js/` — JavaScript modules split by the game's existing section headers
- `build.mjs` — rebuilds a runnable root `index.html` when needed

The repository intentionally keeps the modular source inside the `index.html/` folder rather than creating a root `index.html` file.
