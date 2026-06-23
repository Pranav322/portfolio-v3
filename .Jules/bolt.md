## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2024-06-23 - Concurrent API Token Fetching Bottleneck
**Learning:** In a windowed frontend architecture where multiple sub-components (NowPlaying, TopTracks, etc.) mount simultaneously and fetch from distinct backend routes, they can inadvertently trigger parallel N+1 backend requests for the same underlying authentication token if the library wrapper (e.g., `getAccessToken`) lacks in-memory caching.
**Action:** Implement an in-memory Promise cache that prioritizes checking if the promise exists before checking data expiration. This ensures concurrent requests hook into the same in-flight fetch promise rather than initiating redundant parallel requests.
