## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-04-08 - [O(N) Ref Updates in React Lists]

**Learning:** Attaching a single scroll-target `ref` to every element inside a `.map()` loop in a React component degrades performance. Because the ref changes target N times during rendering, it causes O(N) ref assignments per commit, which can be noticeably slow as lists grow (e.g., in a terminal component history).
**Action:** Instead of putting the ref on mapped items, always attach the ref to a single empty element (e.g., `<div ref={scrollRef} />`) at the bottom/end of the list container when building auto-scrolling views.
