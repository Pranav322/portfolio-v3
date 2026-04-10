## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [Ref Assignment in React Mapped Lists]

**Learning:** Attaching a single scroll-target ref to every element inside a `.map()` loop (e.g., `<div ref={myRef} />` for mapped commands) degrades performance by triggering N ref updates per commit phase. React constantly re-attaches the ref for every item as it renders the list, leading to unnecessary DOM operations and performance overhead, particularly as the list grows.
**Action:** Always attach such target refs to a single empty element (like `<div ref={myRef} />`) at the bottom of the list when the goal is simply scrolling to the end, thus reducing ref updates from O(N) to O(1).
