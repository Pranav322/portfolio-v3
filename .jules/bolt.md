## 2024-05-30 - [Terminal Ref Attachment]

**Learning:** In React components like `Terminal`, avoid attaching a single scroll-target ref to every element inside a `.map()` loop, as it degrades performance by triggering N ref updates per commit.
**Action:** Instead, attach the ref to a single empty element (e.g., `<div ref={terminalRef} />`) at the end of the list.
