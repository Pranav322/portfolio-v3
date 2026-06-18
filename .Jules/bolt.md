## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [In-Memory Promise Caching for Concurrent Requests]

**Learning:** When caching API requests to prevent redundant concurrent fetches (e.g., token refreshes), evaluating only `now < expirationTime` is insufficient during the pending state. Multiple callers will see the cache as "expired" and trigger new fetches before the first one completes.
**Action:** Explicitly reset the tracking variable to a pending state (e.g., `tokenExpirationTime = 0`) when a fetch begins, and check for this state (`tokenExpirationTime === 0 || now < tokenExpirationTime`) to correctly serve the pending promise to concurrent callers. Also ensure `.catch()` resets the cache and re-throws errors to avoid permanent poisoning.
