## 2024-06-02 - Promise Caching for External APIs

**Learning:** When using an in-memory Promise cache for external API fetches (like Spotify tokens), checking only `now < tokenExpirationTime` fails during concurrent initial requests because the first fetch hasn't completed and set the expiration time yet. Additionally, silently catching or passing through failed HTTP responses (e.g., rate limits or 500 errors) poisons the cache with a permanently rejected state or broken data.
**Action:** When caching Promises, always check for an explicit pending state (e.g., `tokenExpirationTime === 0`) to properly coalesce concurrent requests. Also, always check `!response.ok` to throw immediately, and attach a `.catch()` block to the cached promise chain to reset the cache variable (`cachedPromise = null`) before re-throwing, ensuring subsequent requests can retry on failure.

## 2024-06-02 - Promise Caching for External APIs

**Learning:** When using an in-memory Promise cache for external API fetches (like Spotify tokens), checking only `now < tokenExpirationTime` fails during concurrent initial requests because the first fetch hasn't completed and set the expiration time yet. Additionally, silently catching or passing through failed HTTP responses (e.g., rate limits or 500 errors) poisons the cache with a permanently rejected state or broken data.
**Action:** When caching Promises, always check for an explicit pending state (e.g., `tokenExpirationTime === 0`) to properly coalesce concurrent requests. Also, always check `!response.ok` to throw immediately, and attach a `.catch()` block to the cached promise chain to reset the cache variable (`cachedPromise = null`) before re-throwing, ensuring subsequent requests can retry on failure.
