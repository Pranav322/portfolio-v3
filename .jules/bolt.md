## 2026-03-08 - Prevent Framer Motion Re-evaluation with Referential Stability
**Learning:** Arrays of objects containing JSX or functions passed to Framer Motion components with expensive hooks (e.g., `useSpring`, `useTransform`) cause significant performance degradation if not memoized, as they force re-evaluation of those expensive hooks on every unrelated parent re-render.
**Action:** Always wrap such arrays in `useMemo` before passing them to components with expensive animations, and ensure the child components consuming those arrays are wrapped in `React.memo`.
