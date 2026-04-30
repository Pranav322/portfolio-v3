## 2026-04-30 - Cached Spotify Access Token Promise

**Learning:** Concurrent data fetching in React Server Components or simultaneous client requests can trigger redundant, unbatched calls to authentication endpoints if the token request isn't cached as a pending Promise. Caching just the resolved token still leaves a window where multiple components can initiate duplicate requests while the first request is pending.
**Action:** When implementing an in-memory cache for a pending Promise that tracks expiration time, cache the Promise itself and ensure the cache validation logic correctly evaluates the initial pending state (e.g., tokenExpirationTime === 0) so concurrent requests do not inadvertently bypass the cache while the first request is still resolving.
