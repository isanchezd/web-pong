# AGENTS.md

## Project
- Single-package browser Pong app using npm, Vite, and TypeScript; Node `^20.19.0` or `>=22.12.0` per `README.md`.
- Runtime entrypoint is `src/index.html` -> `src/main.ts` -> `Game` in `src/game/game.ts`.
- `Game` wires hardcoded DOM IDs: `board`, `counter-J1`, and `counter-J2`; keep these in sync with `src/index.html`.

## Commands
- Install: `npm install`.
- Dev server: `npm run start` (`vite`).
- Main verification for app changes: `npm run build`; it writes ignored artifacts under `dist/`.
- `npm test` currently runs `npm run typecheck`; there is no configured unit test, lint, or format script.

## Implementation Notes
- Game constants, canvas size, colors, speeds, and keyboard codes live in `src/game/constants.ts`; controls use `KeyboardEvent.code` values like `KeyQ` and `Semicolon`.
- The game loop is in `GameController.start()` and runs with `setInterval` at `FPS`.
- Work in `src/`; do not edit generated `dist/` output.
- `package-lock.json` is tracked in this repository.
