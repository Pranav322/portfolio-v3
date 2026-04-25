## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2024-04-25 - Window Control Accessibility

**Learning:** Icon-only window controls (Minimize, Maximize, Close) lack context for screen readers and keyboard users without explicit attributes. Native HTML `title` tooltips and keyboard focus indicators are essential for these OS-like interfaces.
**Action:** Always add `aria-label`, `title`, and `focus-visible` styling (e.g., `focus-visible:ring-2 focus-visible:outline-none`) to interactive icon-only elements to ensure full accessibility.
