## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [DOM Lookup Optimization in Game Loops]

**Learning:** For browser-based games (e.g., `public/games/racing/game.js`), querying the DOM via `document.getElementById` inside performance-critical loops (like `updateScore` running 60fps) introduces significant overhead and can block the main thread.
**Action:** Always cache frequently accessed DOM elements in the class constructor or initialization phase to eliminate repetitive lookup overhead during the game loop.
