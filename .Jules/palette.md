## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Accessible Custom File Uploads

**Learning:** Styling custom file upload inputs (`<input type="file">`) with Tailwind's `hidden` class completely removes them from the accessibility tree and keyboard tab order.
**Action:** Never use `hidden` for custom file inputs. Instead, use `sr-only` on the input and apply `focus-within` utility classes (e.g., `focus-within:ring-2`) to the wrapping `<label>` to maintain keyboard accessibility and visual focus states.
