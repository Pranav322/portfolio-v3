## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Memoization of Arrays Passed to Framer Motion Components]
**Learning:** Arrays defined inside a component body without memoization are recreated on every render. If these arrays are passed down to child components that use heavy computation or hooks like Framer Motion's `useSpring` and `useTransform` (e.g., `IconContainer` in `floating-dock.tsx`), it causes unnecessary and expensive re-renders across all those children when the parent updates (e.g., from simple state changes like opening a modal).
**Action:** For completely static data, move the array/object definition completely outside the component scope to avoid hook overhead. If the data requires component scope (e.g., uses state setters in callbacks), wrap it in `React.useMemo` to ensure referential equality and prevent performance degradation in heavy child components.
