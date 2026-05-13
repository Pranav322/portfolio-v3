## 2025-02-12 - [Conditional Rendering vs Code Splitting]
**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.
## 2025-02-12 - [In-Memory Cache for Pending Promises]
**Learning:** When implementing an in-memory cache for a pending Promise that also tracks expiration time, the cache validation logic must explicitly check the initial pending state (e.g., `tokenExpirationTime === 0`). Otherwise, concurrent requests evaluating `tokenExpirationTime > Date.now()` will find it false (0 > now) and inadvertently bypass the cache while the first request is still resolving, defeating the purpose of the cache for concurrent loads.
**Action:** Always reset the tracking variable (e.g., `tokenExpirationTime = 0`) before initiating the new fetch and include `tokenExpirationTime === 0` in the cache hit condition.
