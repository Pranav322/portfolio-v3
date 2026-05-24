## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - OS Window Control Accessibility

**Learning:** Creating UI elements that mimic OS window controls (like the Mac-style red, yellow, green terminal header dots) with generic `div` elements prevents keyboard navigation and hides their purpose from screen reader users.
**Action:** Always use semantic `<button>` elements with clear `aria-label`, `title` for hover/focus context, and `focus-visible` utility classes for these interactive window controls, even if they are purely decorative or have minimal functionality.
