## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-03-01 - Missing ARIA Labels in Duplicated UI
**Learning:** Found a recurring a11y issue where all desktop window components (11 files) duplicated their header controls (Minimize/Maximize/Close) without ARIA labels, making them invisible to screen readers. This indicates a missed opportunity to centralize window controls into a shared `WindowControls` component for better maintainability and accessibility.
**Action:** When creating windowing systems or similar repeated UI, centralize interactive controls early to ensure accessibility improvements (like ARIA labels) propagate everywhere instantly.
