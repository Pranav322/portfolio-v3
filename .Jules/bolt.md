## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2026-03-25 - [Memoizing Expensive Framer Motion Hooks]

**Learning:** Components using expensive Framer Motion hooks (e.g., `useSpring`, `useTransform`) must be wrapped in `React.memo` to prevent performance degradation from parent re-renders. Additionally, all props passed to them (like arrays or callbacks) must be properly memoized with `useMemo` or `useCallback` at the parent level to maintain referential equality.
**Action:** Always verify if components rendering heavy hooks are protected against unnecessary re-renders. If a parent passes an inline array or object, memoize it.
