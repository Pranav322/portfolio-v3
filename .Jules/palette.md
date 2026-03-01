## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Focus as Virtual Mouse
**Learning:** UX patterns relying on mouse position (like mac-style docks) often fail for keyboard users. By treating keyboard focus as a "virtual mouse" at the element's center coordinates, we can reuse complex motion logic without duplication.
**Action:** When using `useMotionValue` for mouse-driven layouts, implement `onFocus` handlers that programmatically set the motion value to the focused element's center (e.g., `mouseX.set(center)`) to trigger the same visual feedback.
