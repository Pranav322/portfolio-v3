## 2024-05-18 - Concurrent Promise Caching for API Tokens

**Learning:** When multiple frontend components request data simultaneously, caching the resolved token isn't enough; you must cache the _Promise_ itself. Furthermore, it's critical to attach a `.catch()` block to the cached promise to reset it, preventing transient network errors from permanently poisoning the cache.
**Action:** Always cache the Promise object directly for concurrent request deduplication, and ensure failed promises clean up their own cache state before re-throwing.
