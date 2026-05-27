## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-05-27 - [Caching Concurrent Promises]

**Learning:** When multiple components request an API simultaneously on mount (e.g., Spotify dashboard components), caching just the final resolved value isn't enough; concurrent requests will still trigger multiple initial network calls.
**Action:** Cache the Promise itself (`let cachedPromise: Promise<any> | null`) and return it immediately while pending. Also, explicitly manage expiration during the pending state (`tokenExpirationTime = 0`) and attach a `.catch()` handler to reset the cache if the request fails, preventing transient network errors from permanently poisoning the cache.
