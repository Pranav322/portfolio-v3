## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - OS Window Controls Accessibility

**Learning:** In desktop-like OS interfaces, window controls (Minimize, Maximize, Close) are often implemented using generic animated icons (e.g., Framer Motion's `<motion.button>`). Because these icons are self-explanatory to visual users familiar with desktop OS conventions, it's easy to overlook that they are completely opaque to screen readers and lack native hover tooltips.
**Action:** Always apply `aria-label` and `title` attributes directly to `<motion.button>` wrappers for window controls to ensure semantic parity with native OS interfaces.
