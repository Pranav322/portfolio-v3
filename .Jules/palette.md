## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Accessible Window Controls
**Learning:** Across the OS UI, window controls (Minimize, Maximize, Close) were consistently implemented as icon-only buttons (`IconMinus`, `IconSquare`, `IconX`) without accompanying context, making them opaque to screen readers and difficult to track via keyboard navigation.
**Action:** Always apply `aria-label`, dynamic `title` attributes (e.g., toggling between "Maximize" and "Restore"), and prominent `focus-visible` classes (like `focus-visible:ring-2`) to icon-only control buttons to ensure they meet basic accessibility and keyboard navigation standards.
