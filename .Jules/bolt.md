## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2025-02-13 - [Framer Motion Component Memoization]
**Learning:** Components wrapping Framer Motion hooks (like `useSpring` or `useTransform`) or accepting array props can cause unnecessary re-renders in parents.
**Action:** Use `React.memo` with a `displayName` on the component, and wrap array props in `useMemo` in the parent.
