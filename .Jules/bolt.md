## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-05-26 - [Cache API Request Promises for Concurrent Renderings]

**Learning:** When multiple components requiring the same API data (like Spotify tokens) render concurrently, they can trigger duplicate simultaneous fetch requests before the first one resolves. Simply caching the resolved value does not prevent the race condition.
**Action:** Always cache the _pending Promise_ of the API request alongside an expiration state. This ensures all concurrent callers await the same request rather than spawning duplicates.
