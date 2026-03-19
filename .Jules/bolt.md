## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Memoization of Framer Motion Components]
**Learning:** Components wrapping expensive Framer Motion hooks (like `useSpring` and `useTransform` in `IconContainer`) execute those calculations on every render of their parent unless memoized. Furthermore, for memoization to work effectively, any complex props (such as arrays or callback functions) passed to those components must also be referentially stable (using `useMemo` or `useCallback` in the parent component).
**Action:** Always wrap components heavy on Framer Motion calculations with `React.memo` and strictly memoize all complex props provided to them from parents.
