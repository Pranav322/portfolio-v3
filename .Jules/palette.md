## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Window Control Accessibility

**Learning:** Multiple window components in this app replicate OS-like header controls (Minimize, Maximize, Close) using icon-only buttons. Without explicit `aria-label`, `title`, and `focus-visible` classes, these essential interaction points are entirely inaccessible to screen readers and keyboard navigation users.
**Action:** When creating or refactoring window-like UI components, always treat header controls as standalone icon buttons: provide descriptive `aria-label`s, `title`s for hover tooltips, and distinct `focus-visible` styles (e.g., `focus-visible:ring-2`) to ensure full accessibility parity with native OS windows.
