## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [Ref Assignment in Render Loops]

**Learning:** Attaching a scroll-target ref to every element inside a `.map()` loop in React components (like the `Terminal` command history) causes React to update N refs per commit, which degrades performance as the list grows.
**Action:** Always attach the scroll-target ref to a single empty element (e.g., `<div ref={terminalRef} />`) at the very end of the rendered list instead of inside the loop.
