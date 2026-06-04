## 2025-06-04 - Caching Spotify Access Tokens

**Learning:** Adding an in-memory Promise cache to `getAccessToken` in `lib/spotify.ts` prevents redundant concurrent API requests when multiple components (Now Playing, Top Tracks, Playlists, etc.) request data simultaneously on page load. Crucially, the cache mechanism must attach a `.catch()` block to reset the cache state if the fetch fails, preventing permanent poisoning of the cache, and the check for cache hit must account for the pending state (`tokenExpirationTime === 0`) to correctly return the pending promise.
**Action:** When implementing in-memory caching for asynchronous fetches to prevent race conditions or concurrent requests, always explicitly track pending states and catch Promise rejections to reset the tracking variables.
