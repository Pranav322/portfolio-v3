## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [Ref Reuse in Maps & Layout Thrashing]
**Learning:** Using a single `useRef` hook for elements inside a `.map()` loop results in the ref always pointing to the last rendered element, causing bugs in logic that depend on the ref (like tooltip positioning). Additionally, accessing `getBoundingClientRect()` inside the `style` prop of a component forces synchronous layout recalculations (thrashing) on every render.
**Action:** For list items requiring positioning data, capture `event.currentTarget.getBoundingClientRect()` in the event handler and store it in state, rather than using refs and reading layout during render.
