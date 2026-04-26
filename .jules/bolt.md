## 2025-04-26 - O(N) Ref Updates in Terminal Loop
**Learning:** Found an anti-pattern in the `Terminal` component where a single `terminalRef` was being attached to every element inside the `commands.map()` loop. This degraded performance by triggering N ref updates per commit (React assigning the ref to each element sequentially, with the last one winning).
**Action:** Always attach a scroll-target ref to a single empty element (e.g., `<div ref={targetRef} />`) at the end of the list instead of inside the `.map()` loop to avoid unnecessary ref updates during render phases.
