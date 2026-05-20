## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Semantic Custom Window Controls

**Learning:** Decorative mock-OS window controls (like the red/yellow/green Mac dots) are often implemented using non-semantic `div`s. While visually accurate, this removes them from the tab order and leaves screen reader users without context for interactive elements.
**Action:** When implementing custom OS-like window decorations, always use semantic `<button>` tags with clear `aria-label`s, `title` attributes (for hover tooltips), and `focus-visible` classes, even if the elements are purely decorative or have minimal functionality.
