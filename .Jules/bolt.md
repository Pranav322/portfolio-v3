## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2024-05-20 - [Spotify API Token Caching]

**Learning:** The Spotify API token fetch was not cached. When multiple frontend components request data simultaneously, it resulted in redundant concurrent requests to the Spotify token API, causing unnecessary network overhead and potentially hitting rate limits.
**Action:** Implement an in-memory Promise cache for API tokens. Ensure the caching logic explicitly checks for a pending state (e.g., `tokenExpirationTime === 0`) to prevent concurrent requests from bypassing the cache, and explicitly resets the cache variable on failure.
