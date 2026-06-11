## 2024-06-11 - [In-memory Promise Cache for Concurrent API Requests]
**Learning:** Multiple frontend UI components requesting data simultaneously (like Now Playing, Top Tracks) caused redundant concurrent fetches to the Spotify API for access tokens, exposing an architectural bottleneck where independent components triggered overlapping token requests.
**Action:** Implemented an in-memory Promise cache that explicitly tracks pending states (`tokenExpirationTime = 0`) and caches the promise chain with a `.catch()` block to handle and reset transient errors, preventing redundant requests.
