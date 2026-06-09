## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-06-09 - [In-Memory Promise Caching for Token Refreshes]

**Learning:** When refreshing an expired cached Promise, evaluating only `now < expirationTime` returns false if `expirationTime` is temporarily 0, causing concurrent requests to incorrectly bypass the cache. Also, failed HTTP responses must be thrown before `.json()` to prevent parsing errors from permanently poisoning the cache.
**Action:** Explicitly evaluate the pending state (e.g., `tokenExpirationTime === 0 || now < tokenExpirationTime`), throw on `!response.ok`, and append a `.catch()` block to reset the cache variable (e.g., `cachedPromise = null`).
