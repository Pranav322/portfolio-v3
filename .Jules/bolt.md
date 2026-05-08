## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-13 - [Caching Promises for Concurrent Requests]
**Learning:** When implementing an in-memory cache for a pending Promise that also tracks an expiration time, the initial pending state must be carefully considered. If the cache validation logic strictly checks `Date.now() < tokenExpirationTime`, concurrent requests will bypass the cache because `tokenExpirationTime` remains `0` while the first request is still resolving.
**Action:** When caching a Promise and using an expiration time, ensure the condition correctly evaluates the pending state (e.g., checking if `tokenExpirationTime === 0` along with the current time) so that concurrent requests effectively wait for the same resolving Promise.
