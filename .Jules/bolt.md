## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2024-05-15 - [Memoizing Framer Motion Components]
**Learning:** Components containing expensive Framer Motion hooks (`useSpring`, `useTransform`) re-evaluate on every render if not memoized, causing significant performance degradation when the parent component state changes frequently (e.g., when passing an unmemoized handler or inline array).
**Action:** Always wrap heavy components (like `IconContainer`, `FloatingDock`, `DesktopIcons`) with `React.memo` and ensure their props (handlers via `useCallback`, arrays via `useMemo`) are referentially stable to prevent cascading re-renders and unnecessary animation hook evaluations.
