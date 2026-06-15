## 2026-06-15 - Concurrent API Fetch Caching Bypass

**Learning:** When refreshing an expired cached Promise in an in-memory cache, setting `tokenExpirationTime = 0` while the promise is pending causes `now < tokenExpirationTime` to evaluate to false. This incorrectly bypasses the cache for concurrent requests.
**Action:** Explicitly check for the pending state (e.g., `tokenExpirationTime === 0`) alongside the expiration check to correctly deduplicate concurrent requests.
