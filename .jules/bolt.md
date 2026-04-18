## 2026-04-18 - React Ref Reassignment Bottleneck in Lists

**Learning:** Attaching a single scroll-target ref (`ref={myRef}`) to every element inside a `.map()` loop degrades performance. React will update the ref N times per commit (once for each item rendered), which causes unnecessary overhead, especially as the list grows (e.g., in a terminal command history).
**Action:** Always attach the scroll-target ref to a single empty element (e.g., `<div ref={myRef} />`) at the end of the list instead of inside the `.map()` loop.
