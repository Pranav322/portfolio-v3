## 2025-04-23 - Avoid single ref assignment in map loop
**Learning:** Attaching a single scroll-target ref to every element inside a `.map()` loop degrades performance by triggering N ref updates per commit in React.
**Action:** Attach the ref to a single empty element (`<div ref={myRef} />`) at the end of the list instead of inside the `.map()` loop.
