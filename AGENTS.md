# AGENTS.md

## Project
- Single-package browser Pong app using npm, Parcel 2, and TypeScript; Node 18+ per `README.md`.
- Runtime entrypoint is `src/index.html` -> `src/main.ts` -> `Game` in `src/game/game.ts`.
- `Game` wires hardcoded DOM IDs: `board`, `counter-J1`, and `counter-J2`; keep these in sync with `src/index.html`.

## Commands
- Install: `npm install`.
- Dev server: `npm run start` (`parcel ./src/index.html`).
- Main verification for app changes: `npm run build`; it writes ignored Parcel artifacts under `dist/` and `.parcel-cache/`.
- `npm test` is a placeholder that always fails; there is no configured test, lint, or format script.

## Implementation Notes
- Game constants, canvas size, colors, speeds, and keyboard codes live in `src/game/constants.ts`; controls use `KeyboardEvent.code` values like `KeyQ` and `Semicolon`.
- The game loop is in `GameController.start()` and runs with `setInterval` at `FPS`.
- Work in `src/`; do not edit generated `dist/` output.
- `.gitignore` ignores `package-lock.json`, so do not treat a local ignored lockfile as authoritative unless the user asks to manage lockfiles.
