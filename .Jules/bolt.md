## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Framer Motion Hooks & Array Memoization]
**Learning:** Components containing expensive Framer Motion hooks (like `useSpring`, `useTransform`, e.g., `IconContainer`) will experience severe performance degradation if they re-render frequently. Furthermore, arrays containing JSX elements or functions passed as props to such components will always break referential equality unless explicitly memoized.
**Action:** Always wrap components using expensive Framer Motion calculations in `React.memo`. Crucially, ensure any object arrays with JSX/functions passed to them are memoized via `useMemo` at the parent level, or the component memoization will be defeated.
