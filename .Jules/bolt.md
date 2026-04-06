## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [Ref Assignment in React Lists]

**Learning:** Attaching a scroll-target `ref` to every item rendered inside a `.map()` loop (e.g., in `Terminal.tsx`) degrades performance because React updates the ref reference N times on every render.
**Action:** Avoid assigning refs to dynamic list items just for scroll targeting. Instead, place a single empty element (e.g., `<div ref={terminalRef} />`) at the end of the container.
