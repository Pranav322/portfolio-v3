## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2026-02-13 - Desktop Metaphor Accessibility
**Learning:** Desktop interfaces often use double-click for mouse users, which is inaccessible to keyboard users. A hybrid approach where `onClick` detects keyboard activation (via `event.detail === 0`) allows opening items immediately with Enter/Space, preserving the desktop metaphor for mouse users while ensuring keyboard efficiency.
**Action:** For desktop-like icons, use `onClick` handlers that check for `event.detail === 0` to bypass double-click logic for keyboard interactions.
