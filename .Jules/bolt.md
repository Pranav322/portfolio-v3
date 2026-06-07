## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2024-05-24 - Spotify Token Concurrent Fetch Optimization

**Learning:** When multiple frontend components request data simultaneously, the un-cached `getAccessToken` in `lib/spotify.ts` causes redundant concurrent requests to the Spotify API, leading to potential rate limits and slower page loads. Simply caching the token string isn't enough; caching the pending _Promise_ prevents concurrent calls from slipping through during the fetch.
**Action:** Implement an in-memory Promise cache (`cachedPromise`) for the access token fetch. Ensure to handle `!response.ok` appropriately, and always attach a `.catch()` block to the cached promise chain to reset `cachedPromise = null` to prevent poisoning the cache with transient errors.
