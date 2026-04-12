## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.
## 2025-02-13 - Add Accessible Labels to Window Controls
**Learning:** Icon-only buttons used for window controls (minimize, maximize, close) using Tabler Icons were missing `aria-label` attributes across all 11 OS-like window components in `app/components/windows/`. Adding the native HTML `title` attribute along with `aria-label` provides a simple, standard tooltip on hover, improving usability for sighted users without requiring custom Tooltip components or complex states.
**Action:** Always verify that interactive icon components (like those used for closing or minimizing modals) explicitly declare `aria-label` for screen readers and `title` for hover tooltips. Use regex or scripting carefully when batch updating multiple UI components to avoid duplicate attributes.
