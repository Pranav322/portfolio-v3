## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2025-04-25 - [Terminal Ref Loop Fix]
**Learning:** Attaching a React ref inside a `.map` block assigns the ref multiple times in a single render loop, causing redundant ref updates that could affect performance.
**Action:** Move the ref to an empty `<div>` immediately following the loop, particularly for things like "scroll to bottom" behavior.
