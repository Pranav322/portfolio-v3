## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [In-Memory API Deduplication]

**Learning:** When multiple frontend components request data from different API routes simultaneously, Next.js server-side code can encounter identical concurrent backend fetches (like token requests). Since API routes in Next.js execute in the same Node.js process (until scaled), module-level variables can serve as a shared cache.
**Action:** Use an in-memory Promise cache to deduplicate simultaneous external API requests, especially for authentication tokens required by multiple parallel endpoints.
