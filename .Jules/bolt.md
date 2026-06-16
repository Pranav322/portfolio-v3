## 2024-10-24 - [In-memory Promise Cache for Concurrent API Requests]

**Learning:** Concurrent calls to asynchronous functions that lack state tracking will trigger duplicate API requests, bypassing subsequent caches. When using an in-memory Promise cache to mitigate this, zeroing out the expiration tracker before the fetch resolves is critical. If the condition only checks `now < expirationTime`, concurrent requests evaluating a '0' state will incorrectly bypass the pending cache and trigger redundant fetches.
**Action:** Always track pending states with a specific value (e.g., `0`) and explicitly include it in the cache hit logic (e.g., `expiration === 0 || now < expiration`) to ensure concurrent requests await the in-flight Promise.
