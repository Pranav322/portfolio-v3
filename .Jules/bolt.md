## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [In-Memory Promise Caching for APIs]

**Learning:** Concurrent initial renders of multiple Spotify components cause redundant calls to `getAccessToken()` because the previous fetch hasn't resolved to update a token cache. Caching only the token still leads to multiple network requests.
**Action:** Cache the `Promise` of the fetch request rather than just the resolved token so concurrent requests await the same underlying fetch. Always handle HTTP errors (`!response.ok`) before parsing to prevent poisoning the cache, and explicitly reset state (`tokenExpirationTime = 0`, `cachedTokenPromise = null` in `.catch`) to allow automatic recovery from transient errors.
