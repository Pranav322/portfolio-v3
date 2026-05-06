## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Promise Caching for External API Calls]
**Learning:** Concurrent UI components fetching from the same external token endpoint (e.g., Spotify Access Token) can trigger multiple simultaneous network requests, bypassing normal cache headers. Storing the pending `Promise` instead of just the resolved token correctly prevents these redundant requests.
**Action:** When creating token fetchers shared across multiple components rendering simultaneously, cache the fetch `Promise` itself and check for failure (`!response.ok`) before caching to avoid poisoning the cache with failed requests.
