## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-24 - Window Control Accessibility & State Management
**Learning:** Consistent window controls (Minimize, Maximize, Close) are critical for usability but often lack accessible labels when implemented as icon-only buttons. Furthermore, implementing minimization via local component state (`if (isMinimized) return null`) requires careful placement of the return statement *after* all React hooks to prevent invariant violations.
**Action:** Always verify ARIA labels on icon-only control buttons and ensure conditional rendering logic respects the Rules of Hooks by placing early returns after hook declarations.
