## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Accessible Custom File Uploads

**Learning:** Using Tailwind's `hidden` class on `<input type="file">` removes it from the accessibility tree and keyboard tab order, breaking keyboard navigation for file uploads.
**Action:** When styling custom file inputs, always use `sr-only` on the input element and apply `focus-within` utility classes (e.g., `focus-within:ring-2 focus-within:outline-none`) to its wrapping `<label>` to maintain keyboard accessibility and visual focus states.
