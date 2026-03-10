## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Accessibility for Reusable Window Controls
**Learning:** Reusable OS-style window UI elements (like Minimize, Maximize, Close icons) across various window components (e.g., SpotifyWindow, BrowserWindow) often lack semantic context, making them completely inaccessible to screen reader users and ambiguous to keyboard users without hover.
**Action:** Always include both `aria-label` (for screen readers) and `title` (for mouse hover tooltips) on all icon-only window control buttons across the application to ensure consistent, accessible context regardless of input method.
