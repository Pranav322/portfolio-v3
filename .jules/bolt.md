## 2024-05-19 - Initial Learnings
**Learning:** Arrays of objects containing JSX or functions must be memoized with `useMemo` before being passed to memoized components to ensure referential stability and prevent unnecessary re-renders.
**Action:** Always wrap arrays of objects containing JSX or functions in `useMemo` before passing them to memoized components.

## 2024-05-19 - FloatingDock Framer Motion hooks
**Learning:** Components using expensive Framer Motion hooks like `useSpring` and `useTransform` within responsive arrays (like `FloatingDock`) trigger heavy re-renders on parent state changes. Passing unmemoized arrays (like `links`) or callbacks (like `onWallpaperChange`) breaks referential equality and nullifies `React.memo`.
**Action:** When using Framer Motion hooks inside mapped components, ALWAYS wrap the component in `React.memo`, AND ensure the props being passed down (arrays, objects, functions) are properly memoized using `useMemo` and `useCallback` at the parent level.
