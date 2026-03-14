## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-03-14 - Duplicated Window Controls
**Learning:** Repetitive UI components that are duplicated across multiple files (like window controls for Minimize/Maximize/Close) are prone to missing accessibility attributes. Since they use icon-only buttons, omitting both `aria-label` (for screen readers) and `title` (for tooltips) causes a significant UX gap for multiple user types.
**Action:** Always ensure that both `aria-label` and `title` attributes are included on icon-only buttons that provide core application functionality, especially when these controls are manually duplicated across similar components rather than abstracted into a shared UI component.
