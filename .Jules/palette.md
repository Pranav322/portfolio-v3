## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Dynamic Positioning for Mapped Elements
**Learning:** Using a single `useRef` for elements in a map loop will only capture the last element, causing positioning bugs for overlays (like tooltips).
**Action:** Use `useState<HTMLElement | null>` to store `event.currentTarget` as the anchor element for precise positioning relative to the interacted item.

## 2025-02-23 - Keyboard Detection in Click Handlers
**Learning:** React's `onClick` event fires for both mouse clicks and keyboard activation (Enter/Space) on buttons. `event.detail === 0` reliably identifies keyboard activation.
**Action:** Use `event.detail === 0` to provide keyboard-specific behavior (like single-press activation) while maintaining mouse-specific logic (like double-click).
