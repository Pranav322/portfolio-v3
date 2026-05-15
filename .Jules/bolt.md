## 2024-05-15 - Cache Promises to Prevent Concurrent Duplicate Fetches

**Learning:** When fetching tokens or data used by multiple components rendering simultaneously, caching just the resolved result isn't enough. Concurrent requests will still fire.
**Action:** Cache the Promise itself during the pending state. When caching Promises with expiration, always handle the initial pending state (e.g., `tokenExpirationTime === 0`), check `!response.ok` before caching, and clear the cache variable in `.catch()` to prevent caching failed states.
