## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Accessible Window Controls

**Learning:** Custom OS-like window controls built with `motion.button` and icon-only content lack context for screen readers and keyboard users. `focus-visible` states are critical for keyboard navigation, and `aria-label`/`title` attributes for dual-state buttons (like Maximize/Restore) must dynamically update to reflect the current state.
**Action:** When implementing custom window controls, always add descriptive `aria-label` and `title` attributes (dynamic where necessary), and ensure the buttons have clear `focus-visible:ring-2 focus-visible:outline-none` classes to support keyboard accessibility.
