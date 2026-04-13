## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2024-05-19 - Terminal Scroll Ref Optimization
**Learning:** Attaching a scroll-target ref to every element inside a `.map()` loop in a React component degrades performance by triggering N ref updates per commit. It causes unnecessary re-evaluations, especially on frequently updated components like Terminals.
**Action:** When implementing auto-scroll in lists, attach the ref to a single empty element (e.g., `<div ref={endRef} />`) at the end of the list instead of each mapped item.
