## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2026-04-16 - Prevent Excessive Ref Updates
**Learning:** In React, attaching a single `ref` inside a `.map()` loop causes the ref to be redundantly reassigned $ times during every commit phase, which is an unnecessary (N)$ operation that slightly degrades performance when the list grows.
**Action:** Always place scroll-target refs on a single, dedicated empty element (e.g., `<div ref={myRef} />`) at the end of the mapped list rather than attaching it to every rendered item.
