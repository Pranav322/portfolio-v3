## 2026-06-03 - Avoid redundant token requests across multiple concurrent API routes

**Learning:** Multiple components simultaneously triggering independent backend API endpoints can cause identical, concurrent authentication fetch requests if not properly cached at the Promise level.
**Action:** Apply an in-memory Promise cache strategy with proper pending state and failure rejection handling to prevent this issue next time.
