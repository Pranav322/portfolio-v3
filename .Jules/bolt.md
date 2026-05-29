## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [In-memory Promise Caching Resilience]

**Learning:** When implementing an in-memory Promise cache for API requests (like Spotify tokens), transient errors (like 429 or 500) can permanently poison the cache with a rejected Promise if not explicitly handled. Furthermore, the caching logic must handle pending states explicitly (e.g., `tokenExpirationTime === 0`) to properly deduplicate concurrent requests while the first request is still processing.
**Action:** Always attach a `.catch()` block to the cached promise chain to reset the cache variable (e.g., `cachedPromise = null`) before re-throwing, and ensure the cache hit logic explicitly checks for pending states.
