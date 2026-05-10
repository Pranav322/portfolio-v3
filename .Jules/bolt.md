## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2024-05-10 - Spotify Token Caching Thundering Herd
**Learning:** When multiple API routes or components request the Spotify Access Token simultaneously before the first request resolves, it can trigger a "thundering herd" of duplicate fetch requests.
**Action:** Cache the `Promise` of the fetch request rather than the resolved token, and explicitly zero out the `tokenExpirationTime` while the fetch is pending to prevent concurrent requests from evaluating a stale state and bypassing the cache.
