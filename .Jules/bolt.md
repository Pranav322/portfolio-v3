## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Memoizing Components with Expensive Framer Motion Hooks]

**Learning:** Components that utilize expensive Framer Motion hooks like `useSpring` and `useTransform` (e.g., `IconContainer` in `floating-dock.tsx`) are very susceptible to performance degradation if they re-render due to parent state changes. Simply wrapping them in `React.memo` is necessary but not sufficient; the parent component must also memoize the props it passes (like arrays or objects) using `useMemo` to maintain referential equality and prevent the memoized child from re-rendering anyway.
**Action:** When working with components containing complex animations or motion values, always ensure they are wrapped in `React.memo` AND that any non-primitive props passed to them from the parent are properly memoized with `useMemo` or `useCallback`.
