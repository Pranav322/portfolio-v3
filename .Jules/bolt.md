## 2025-02-12 - [Conditional Rendering vs Code Splitting]

**Learning:** Static imports of components inside conditional blocks (e.g., `{isCLI && <Terminalcomp />}`) are still bundled in the main chunk. Simply wrapping a component in a conditional check does NOT lazy load its code.
**Action:** Always use `next/dynamic` or `React.lazy` for heavy components that are not visible on initial render, especially for "modes" or "tabs" that are hidden by default.

## 2024-05-18 - Promise Caching for Duplicate Network Requests

**Learning:** Caching the Promise of the fetch request (and accurately handling pending state and network failures) is critical for endpoints accessed by multiple components to prevent duplicate concurrent requests.
**Action:** Implement Promise caching to track the pending state when multiple functions request data simultaneously.
