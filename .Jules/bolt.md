## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2026-05-17 - [Cache Promise Instead of Resolved Token]
**Learning:** When components concurrently call multiple endpoints (e.g., top tracks, top artists, recently played), caching the resolved token is insufficient because the first request is still pending while the others fire, leading to duplicate `/api/token` requests and potential rate limiting.
**Action:** Cache the `Promise` of the fetch request and check for a pending state (e.g., `tokenExpirationTime === 0`) to ensure concurrent requests await the same promise. Also, explicitly handle `.catch()` to clear the cache if the promise rejects.
