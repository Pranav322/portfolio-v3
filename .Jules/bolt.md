## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2025-01-09 - Caching Pending Promises for Spotify API Tokens

**Learning:** Concurrent components rendering simultaneously trigger duplicate fetch requests to the Spotify token endpoint before the first request resolves, bypassing standard token caching. Furthermore, caching failed HTTP responses (like 429s) without explicitly checking !response.ok corrupts the cache state.
**Action:** Always cache the Promise of the fetch request rather than just the resolved token, and explicitly evaluate the initial pending state (e.g., tokenExpirationTime === 0) to prevent concurrent bypasses. Additionally, explicitly check and throw on !response.ok to avoid caching invalid token states.
