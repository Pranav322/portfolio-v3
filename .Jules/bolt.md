## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2026-03-12 - [Framer Motion Components Re-render Optimization]
**Learning:** Components containing expensive Framer Motion physics hooks (`useSpring`, `useTransform`) recalculate these values on every render if their parent re-renders. Simply passing props is not enough; if props include arrays of JSX or callbacks without referential equality, it causes massive performance degradation.
**Action:** Always wrap components using expensive Framer Motion hooks in `React.memo()` and ensure all props passed to them (like lists or callbacks) are properly memoized with `useMemo` or `useCallback` at the parent level.
