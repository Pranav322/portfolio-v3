## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2025-02-12 - [Caching native fetch Promises]
**Learning:** When caching asynchronous API requests with the native `fetch` API (like Spotify access tokens), explicitly check `!response.ok` and throw an error before parsing JSON. This prevents silently caching failed HTTP responses (e.g., 429 or 500 errors) that lack expected fields like `expires_in` and can silently corrupt the cache logic.
**Action:** Always validate `response.ok` before evaluating the response payload when caching native `fetch` promises, otherwise you might cache an error response for the entire cache duration.
