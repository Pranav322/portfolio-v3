## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-05-24 - [Promise Caching for Concurrent Requests]

**Learning:** When multiple components fetch data simultaneously on mount (e.g., Spotify components calling `getAccessToken`), they can trigger N+1 identical requests if only the result is cached. Caching the `Promise` of the network request itself prevents these duplicate network calls while the first request is still pending.
**Action:** Always cache the `Promise` rather than just the resolved value when optimizing API calls that may be requested concurrently by multiple components, ensuring you handle rejected promises by clearing the cache.
