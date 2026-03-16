
## 2024-05-24 - Memoizing Expensive Framer Motion Hooks
**Learning:** Components containing Framer Motion hooks like `useSpring` and `useTransform` are expensive to recalculate on every render. Parent re-renders can trigger these calculations unnecessarily if not properly handled, severely degrading performance during animations or interactions.
**Action:** When using Framer Motion hooks inside a child component (like `IconContainer` in `FloatingDock`), ALWAYS wrap the child component in `React.memo()`. Additionally, ensure that the parent component passes stable props (memoizing arrays/objects with `useMemo` and functions with `useCallback`) to preserve referential equality and successfully skip the child's re-render.
