## 2023-10-25 - In-Memory Promise Cache Concurrency Edge Case

**Learning:** When using a tracking variable like `tokenExpirationTime = 0` to denote a pending fetch state, the cache hit logic must explicitly check for this `0` state. Evaluating only `now < tokenExpirationTime` returns false when `tokenExpirationTime` is 0, causing concurrent requests that arrive during the pending state to bypass the cache and trigger redundant fetches.
**Action:** Always explicitly check for the pending state (e.g., `expirationTime === 0`) in the cache hit condition alongside the time evaluation to correctly serve concurrent requests.
