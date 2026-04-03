## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [React Refs inside Map Loops]

**Learning:** Attaching a single React ref (e.g., `ref={myRef}`) to every element inside a `.map()` loop causes React to unnecessarily update the ref N times during the commit phase, severely degrading performance as the list grows.
**Action:** Always attach scroll-target refs to a single empty element (e.g., `<div ref={myRef} />`) at the end of the list rather than inside the `.map()` loop.
