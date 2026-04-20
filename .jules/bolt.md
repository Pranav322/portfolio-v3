## 2026-04-20 - Optimize Terminal Scroll Ref
**Learning:** Attaching a single scroll-target ref to every element inside a React `.map()` loop is a subtle performance leak, as it triggers N ref updates per commit phase.
**Action:** Attach the ref to a single empty element (e.g., `<div ref={terminalRef} />`) at the end of the list. This prevents redundant updates and ensures the input form is scrolled into view properly.
