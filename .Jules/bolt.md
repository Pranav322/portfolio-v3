## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2024-05-28 - [In-Memory Promise Caching for APIs]

**Learning:** When implementing an in-memory cache for API requests like Spotify access tokens, caching the Promise rather than the resolved value prevents race conditions and redundant network calls from concurrent requests. Additionally, explicitly checking `!response.ok` before parsing JSON prevents caching failed responses that could poison the cache logic, and attaching a `.catch()` block ensures transient errors reset the cache.
**Action:** Always cache the Promise object and handle rejected promises/failed HTTP responses carefully when implementing in-memory caches to prevent poisoning the cache state.
