## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-24 - Interactive Contact Information
**Learning:** Static contact information (like email addresses) often forces users to manually select and copy, which is tedious. Converting these into "Click to Copy" buttons with immediate visual feedback (e.g., "Copied!" text + check icon) significantly improves the user experience by reducing friction and providing confirmation.
**Action:** When displaying contact information or copyable data, wrap it in a semantic `<button>` with an `onClick` handler that writes to the clipboard and provides temporary visual feedback. Ensure proper `aria-label`s are used to describe the action (e.g., "Copy email address").
