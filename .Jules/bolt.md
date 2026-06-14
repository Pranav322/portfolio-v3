## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-06-14 - [In-Memory Promise Cache Concurrency]

**Learning:** When implementing an in-memory Promise cache for an API token, evaluating only `now < expirationTime` fails for concurrent requests because the initial request hasn't resolved to set the expiration time yet (it defaults to 0, so `now < 0` is false). This causes concurrent calls to incorrectly bypass the cache and initiate duplicate requests.
**Action:** Explicitly reset the tracking variable to a pending state (e.g., `tokenExpirationTime = 0`) before initiating a new fetch, and ensure the cache hit logic explicitly checks for this pending state (`tokenExpirationTime === 0 || now < tokenExpirationTime`).
