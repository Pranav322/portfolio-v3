## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-05-20 - [Promise Caching for Auth Tokens]

**Learning:** When multiple components fetch data from a third-party API concurrently, failing to cache the _Promise_ of the access token leads to duplicate network requests and potential rate limiting.
**Action:** Always implement an in-memory Promise cache (with proper error handling and expiration reset) for authentication tokens to ensure concurrent requests await the same resolving Promise.
