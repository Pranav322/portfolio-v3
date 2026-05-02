## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-05-02 - [Caching Async API Promises]
**Learning:** When caching asynchronous API tokens (like the Spotify access token), cache the `Promise` of the fetch request rather than just the resolved token. This prevents duplicate concurrent network requests to the endpoint when multiple components that rely on the data render simultaneously. Additionally, explicitly check `!response.ok` and throw an error before parsing JSON to prevent silently caching failed HTTP responses.
**Action:** Always cache the pending Promise object for global async singletons accessed concurrently, and validate HTTP responses before resolving the cached state.
