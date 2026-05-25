## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2026-05-25 - [In-memory Promise Caching for APIs]

**Learning:** When fetching data used across multiple components concurrently (like Spotify tokens), caching only the resolved token is insufficient and leads to race conditions where multiple pending requests spawn separate network calls. Caching the `Promise` itself prevents these duplicate network requests. Additionally, when using expirations, the cache state needs to accurately reflect the "pending" state (e.g. `expirationTime = 0`) before the promise resolves so concurrent requests don't skip the cache check during the fetch.
**Action:** When implementing in-memory caches for data fetched simultaneously by multiple components, cache the `Promise` returned by `fetch` rather than the final result, properly resetting the cache in the `.catch()` block to prevent transient failures from poisoning the cache.
