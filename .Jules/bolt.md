## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [Promise Caching for Concurrent Requests]

**Learning:** In Next.js, when multiple components on the same page (e.g. Spotify Window with NowPlaying, TopTracks, TopArtists) concurrently hit different backend API routes that all fetch an access token from an external service, simply caching the token value is insufficient. All initial concurrent requests will see an empty cache and simultaneously trigger a token fetch.
**Action:** Always cache the `Promise` of the fetch request itself rather than just the final result, and reset the cache validation state (e.g., `tokenExpirationTime = 0`) immediately when a refresh is initiated to ensure concurrent requests properly evaluate the pending state and await the single shared Promise instead of bypassing the cache.
