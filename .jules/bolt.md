## 2025-02-28 - [Promise Cache Concurrency Bypass]

**Learning:** When using an in-memory Promise cache with an expiration time, setting the expiration time to `0` to represent a 'pending' state causes a concurrency bypass if the cache hit logic only evaluates `now < expirationTime`. Concurrent requests will bypass the cache because `now < 0` is false, leading to multiple redundant network requests.
**Action:** Always explicitly check for the pending state (e.g., `expirationTime === 0 || now < expirationTime`) in the cache hit logic to ensure concurrent requests properly await the cached Promise.
