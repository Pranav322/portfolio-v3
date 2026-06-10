## 2025-05-15 - In-Memory Promise Cache Race Condition

**Learning:** When refreshing an expired cached Promise for the Spotify API, using only `now < expirationTime` for cache hits causes concurrent requests to bypass the cache if `expirationTime` is reset to 0 (pending state), leading to redundant network calls.
**Action:** Explicitly reset the tracking variable to a pending state (`tokenExpirationTime = 0`) before fetching, and check for this state in the cache hit logic (`tokenExpirationTime === 0 || now < tokenExpirationTime`).
