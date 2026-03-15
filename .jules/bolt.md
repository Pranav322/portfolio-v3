## 2024-03-15 - Terminal Input Latency Optimization
**Learning:** In terminal-like interfaces, mapping over a large history of commands directly within the main component body causes the entire list to re-render on every keystroke. Additionally, attaching a ref inside a `.map()` loop creates unnecessary ref assignments.
**Action:** Extract list items into a memoized component (`TerminalCommandItem` wrapped in `React.memo`), memoize static visual elements (like `TerminalClock`), and attach the scroll ref to the static input container rather than the dynamic list items.
