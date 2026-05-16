## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-05-16 - [Promise Caching for Concurrent Render Requests]

**Learning:** In Next.js/React, when multiple components that rely on the same API data (like various Spotify widgets) render simultaneously, they can trigger redundant concurrent fetch requests if the token or data isn't cached properly. Caching just the resolved token isn't enough; you must cache the `Promise` of the fetch request so concurrent calls await the same pending network request.
**Action:** When implementing in-memory caches for data used across multiple components, always cache the Promise itself. Ensure the cache correctly handles errors by explicitly clearing the cached Promise in a `.catch()` block to prevent permanently poisoning the cache with failed network requests.
