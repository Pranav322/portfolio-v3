## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-05-18 - [Concurrent API Requests vs Promise Caching]

**Learning:** When multiple components (e.g. Now Playing, Top Tracks, Artists) render simultaneously, they trigger concurrent calls to `getAccessToken()`. Because the original implementation lacked caching, each component independently fetched a new Spotify access token. Simply caching the resolved token doesn't fix the race condition because the first request is still pending when subsequent requests are initiated.
**Action:** Cache the Promise of the fetch request rather than just the resolved token. Explicitly track pending state (e.g., `tokenExpirationTime = 0`) to prevent concurrent requests during the refresh window from bypassing the cache, and add a `.catch()` block to reset the cached promise variable if a transient network error occurs.
