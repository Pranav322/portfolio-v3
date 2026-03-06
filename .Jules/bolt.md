## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Referential Stability in Callbacks]
**Learning:** Passing unstable inline functions (or functions that close over local state without `useCallback`) to heavily memoized or computationally expensive child components completely negates `React.memo`, leading to cascading re-renders across the component tree.
**Action:** Always wrap handler functions passed as props to heavy components with `useCallback` when optimizing with `React.memo` at the boundaries.
