## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2026-03-24 - [Framer Motion and React.memo()]
**Learning:** Components using expensive Framer Motion hooks (`useSpring`, `useTransform`) combined with static array props in Next.js cause performance degradation from parent re-renders. When the parent (e.g., `Navbar`) recreates its configuration array (e.g., `links`) on state change, the child un-memoized components using Framer hooks recalculate everything.
**Action:** Always wrap components containing heavy animation hooks in `React.memo()` and memoize their props (arrays, functions) at the parent level using `useMemo` or `useCallback` to preserve referential equality and prevent cascading re-renders.
