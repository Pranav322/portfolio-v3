## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2026-06-20 - [Promise Cache Concurrency]

**Learning:** When implementing an in-memory Promise cache, setting the expiration tracking variable to 0 (pending state) and checking `(tokenExpirationTime === 0 || now < tokenExpirationTime)` is critical. Checking only `now < tokenExpirationTime` will fail for 0, causing concurrent requests to bypass the cache.
**Action:** Always explicitly handle the pending state when caching Promises to ensure concurrent requests properly await the initial fetch instead of triggering redundant network calls.
