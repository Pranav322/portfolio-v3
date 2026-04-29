## 2024-03-XX - Initial Learnings
**Learning:** We need to find an optimization specific to this repository. Let's look for caching opportunities.
**Action:** Investigating `lib/spotify.ts` for Promise caching, as it appears in memory.
## 2024-03-XX - Duplicate API Calls from Concurrent Rendering
**Learning:** In Next.js/React applications with multiple independent components requesting the same API data (like the Spotify access token), a standard caching pattern checking `if (cachedToken)` is insufficient if the first fetch is still pending. Concurrent components will bypass the cache, resulting in duplicate network requests.
**Action:** When caching asynchronous data used by multiple components, always cache the `Promise` of the fetch request rather than the resolved value. Additionally, reset the expiration timer while the request is in flight to prevent the "thundering herd" problem during token refresh windows.
