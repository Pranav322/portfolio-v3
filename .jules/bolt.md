## 2023-10-27 - Deduplicate concurrent frontend fetches

**Learning:** Sibling client components hitting the same endpoint concurrently (e.g. `TopArtists` and `TopGenres` both fetching `/api/spotify/top-artists` when `SpotifyWindow` opens) will trigger duplicate network requests and backend processing. Next.js doesn't deduplicate these client-side out of the box in the same way `fetch` is deduplicated on the server.
**Action:** Implement a client-side in-memory Map-based promise cache for `fetch` that deduplicates requests matching the same URL/options, making sure to remove the promise from the cache in `.finally()` so data is still fresh on subsequent mounts.
