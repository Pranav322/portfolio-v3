## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2026-06-22 - Spotify Token Promise Cache Pending State

**Learning:** When implementing an in-memory Promise cache to deduplicate token fetches, evaluating only `now < expirationTime` for cache hits will return `false` for `0` (the default pending state). This causes concurrent requests arriving while the first fetch is in-flight to bypass the pending promise and fire redundant network requests, defeating the cache entirely.
**Action:** When tracking expiration time, explicitly set and check for a pending state (e.g., `tokenExpirationTime === 0`) before evaluating the timestamp inequality to ensure in-flight fetches properly capture concurrent requests.
