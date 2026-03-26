## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2026-03-26 - [Canvas Game Loop DOM Queries]
**Learning:** Frequent DOM queries (like `document.getElementById`) inside a 60fps game loop (e.g., `requestAnimationFrame`) can cause unnecessary garbage collection and main thread blocking, reducing game performance.
**Action:** Cache static DOM elements (like score or speed displays) in the game class constructor to avoid repetitive lookups during the render/update cycle.
