## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-04-05 - [React Ref O(N) Re-render Issue in Lists]

**Learning:** Attaching a single `ref` to every element inside a `.map()` loop (e.g. `<div ref={scrollRef}>...</div>`) degrades performance by triggering N ref updates on every render where the list changes.
**Action:** When a scroll-target ref is needed, attach it to a single empty element outside the loop (e.g., `<div ref={scrollRef} />` at the bottom of the list container) instead of to the list items themselves.
