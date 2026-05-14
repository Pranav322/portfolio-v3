## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2024-05-14 - Caching Spotify Access Tokens
**Learning:** When fetching Spotify access tokens in multiple concurrent API routes (e.g., Now Playing, Top Tracks, Playlists), the app makes redundant requests to the token endpoint. The cache validation logic must evaluate the initial pending state (`tokenExpirationTime === 0`) to prevent concurrent requests from bypassing the cache while the first is resolving. Also need to ensure `!response.ok` checks are done to avoid silently caching failed responses.
**Action:** Implemented an in-memory Promise cache for `getAccessToken()` that stores the pending promise and validates the fetch response.
