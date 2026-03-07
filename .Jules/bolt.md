## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-03-07 - [React Render Optimization with Memoization]
**Learning:** In heavy Next.js applications, passing inline arrays containing JSX/functions (e.g., `links` array in `Navbar`) or unmemoized callbacks (e.g., `handleWallpaperChange`) to heavy child components like `DesktopIcons` or `FloatingDock` breaks `React.memo` by changing referential equality on every parent re-render.
**Action:** Always wrap heavy, pure components with `React.memo` (using named function expressions to satisfy ESLint) and ensure all props passed to them are strictly referentially stable by using `useMemo` for objects/arrays and `useCallback` for functions.
