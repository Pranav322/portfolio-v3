## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2026-03-23 - [Memoizing Framer Motion Components vs Props]
**Learning:** Wrapping complex inner Framer Motion components (like those relying on useSpring/useTransform) in `React.memo` is often redundant and adds boilerplate if the parent component is already memoized and its props (like arrays) are stabilized with `useMemo`. React Next.js app crashed potential avoided by ensuring `React` import is present when using hooks implicitly.
**Action:** Prioritize memoizing the expensive props at the source (using `useMemo` for configuration arrays like `links`) and the top-level parent component, rather than indiscriminately applying `React.memo` to all child components, which increases complexity with minimal gain.
