## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-05-30 - [Spotify Token Caching]

**Learning:** The Spotify API integration was repeatedly calling `getAccessToken()` for every backend route without caching the result. When a window loads multiple Spotify components simultaneously (e.g., playlists, recently played, top tracks), this causes N parallel token requests to the Spotify accounts API.
**Action:** Always implement an in-memory Promise cache for API access tokens to prevent redundant concurrent fetches and respect rate limits.
