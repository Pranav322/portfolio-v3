## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Framer Motion Hooks & React.memo]
**Learning:** Components using expensive Framer Motion hooks (e.g., `useSpring`, `useTransform` in `IconContainer`) are highly susceptible to performance degradation if parent state changes cause unnecessary re-renders. Simply passing stable setter functions is not enough if inline arrays or objects are recreated on every render.
**Action:** Always wrap components containing expensive Framer Motion calculations in `React.memo()`. Additionally, ensure all props passed to them (like arrays or callbacks) from the parent are properly memoized with `useMemo` or `useCallback` to maintain referential equality and prevent the memoized child from re-rendering.
