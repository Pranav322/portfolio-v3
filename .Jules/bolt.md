## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Framer Motion Mouse Effects and Memoization]

**Learning:** Components containing expensive Framer Motion hooks that track rapidly changing variables (like `useMotionValue` for `mouseX` updating `useSpring` and `useTransform`) can cause severe re-render cascades if not isolated. In components mapped from arrays (e.g., `IconContainer` in `FloatingDock`), changes to any non-motion props or parent state will needlessly force all mapped instances to recalculate their animations. Additionally, mapping over statically defined arrays inline re-creates the array reference on every parent render, defeating React.memo entirely.
**Action:** When implementing continuous animations driven by parent state, wrap child items in `React.memo` and define `displayName`. Concurrently, ensure that all array or object props passed to the memoized children are wrapped in `useMemo` at the parent level to maintain referential equality.
