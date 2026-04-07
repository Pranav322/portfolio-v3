## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-04-07 - [React Loops and ref assignment]

**Learning:** In React components, avoid attaching a single scroll-target ref to every element inside a `.map()` loop (e.g. `ref={terminalRef}`). This degrades performance by triggering N redundant ref updates during the commit phase per render, as React continually updates the reference to point to the newest item.
**Action:** Attach the ref to a single empty element (e.g., `<div ref={terminalRef} />`) at the end of the list to efficiently target the scroll bottom without redundant updates.
