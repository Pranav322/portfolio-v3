## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Terminal Input Optimization]
**Learning:** Attaching a React ref inside a `.map` loop to track scrolling causes the ref to update for every single mapped item, triggering unnecessary work. Furthermore, unmemoized list items in a highly interactive component like a terminal input cause O(N) re-renders on every single keystroke.
**Action:** Always memoize list items (`React.memo`) that depend on static history. Attach scroll refs to stable containers (like the input container itself) instead of dynamically mapped items to prevent excessive ref updates.
