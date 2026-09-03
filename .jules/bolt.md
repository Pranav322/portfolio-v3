## 2024-05-18 - Client-Side API Deduplication

**Learning:** Sibling React components fetching the same API endpoint on mount trigger redundant network requests, causing unnecessary backend load and rendering delays.
**Action:** Use an in-memory Promise cache (like `deduplicatedFetchJSON`) for GET requests to deduplicate concurrent API calls across sibling components.
