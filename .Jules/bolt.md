## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-04-04 - [Optimize React Refs inside Lists]

**Learning:** Attaching a single scroll-target ref to every element inside a `.map()` loop degrades performance by triggering N ref updates per commit (where N is the list length).
**Action:** Instead, attach the scroll target ref to a single empty element (e.g., `<div ref={scrollRef} />`) at the end of the list to eliminate redundant DOM ref updates during re-renders.
