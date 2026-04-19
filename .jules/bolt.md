## 2024-04-19 - React Ref in Map Loop

**Learning:** In React components like `Terminal`, attaching a single scroll-target ref to every element inside a `.map()` loop degrades performance by triggering N ref updates per commit.
**Action:** Always attach the ref to a single empty element (e.g., `<div ref={terminalRef} />`) at the end of the list instead of inside the map loop.
