## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-02-12 - [In-Memory Promise Caching for Concurrent API Requests]

**Learning:** When multiple Next.js server components request data concurrently (e.g., Spotify API), they all trigger parallel calls to the token endpoint. Caching just the resolved token isn't enough; we must cache the _Promise_ of the fetch to prevent redundant concurrent requests. Also, tracking a "pending" state (`expiration === 0`) is required to avoid cache misses during the initial fetch.
**Action:** Use an in-memory Promise cache with explicit error `.catch()` clearing for high-concurrency external API authentication endpoints to avoid rate limits (429s).

## 2025-02-12 - [Decoupled Input State for Iframes]

**Learning:** Binding an input field directly to an iframe's `src` property triggers a network request and re-render on every keystroke, leading to severe network thrashing and UI thread blocking.
**Action:** Always maintain a separate local state for the input field and only commit to the iframe's `src` on discrete intent actions (like pressing Enter or onBlur).
