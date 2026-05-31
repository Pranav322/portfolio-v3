## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2026-05-31 - [In-Memory Promise Cache Edge Cases]

**Learning:** When implementing an in-memory Promise cache (like for Spotify Access Tokens), evaluating only `now < expirationTime` is insufficient because it evaluates to `false` for a pending state where `expirationTime = 0`, causing concurrent requests to incorrectly bypass the cache while the first fetch is still in flight. Furthermore, failed responses (e.g., 500 errors) lack expected fields like `expires_in`, so we must explicitly check `!response.ok` and throw before JSON parsing to prevent silently caching bad data. Finally, a `.catch()` block MUST reset the cache variable (e.g., `cachedPromise = null`) before re-throwing, otherwise transient network errors permanently poison the cache with a rejected Promise.
**Action:** When caching Promises, explicitly reset the tracking variable to a pending state (e.g., `tokenExpirationTime = 0`), explicitly check for this pending state in the cache hit logic (e.g., `tokenExpirationTime === 0 || now < tokenExpirationTime`), check `!response.ok`, and always attach a `.catch()` block to clear the cache on failure.
