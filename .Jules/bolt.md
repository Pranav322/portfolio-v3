## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2026-06-17 - [Redundant Token Fetches in Concurrent Server Components]

**Learning:** Next.js Server Components that fetch data independently (e.g., Now Playing, Top Tracks) can trigger simultaneous `getAccessToken` calls during a single request lifecycle, creating redundant network requests to the same endpoint and increasing the risk of rate-limiting.
**Action:** Implement an in-memory Promise cache with explicit pending states (`tokenExpirationTime === 0`) and error-rejection handling (`.catch` reset) to deduplicate concurrent API requests across components.
