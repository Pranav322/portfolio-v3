## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - Promise Caching for Concurrent Requests
**Learning:** When multiple React components simultaneously trigger data fetches on mount (like multiple Spotify components on one dashboard), caching just the resolved API token isn't enough. If they fire at the exact same time before the first token resolves, they will all make duplicate network requests.
**Action:** Cache the fetch `Promise` itself rather than just the resolved result. This ensures that concurrent callers will `await` the same pending request instead of triggering their own. Explicitly handle HTTP errors before parsing JSON to avoid silently caching a bad response without `expires_in` fields.
