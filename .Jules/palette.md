## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Window Controls ARIA Labels and Native Tooltips

**Learning:** Window controls (Minimize, Maximize, Close using `IconMinus`, `IconSquare`, `IconX`) across individual desktop window components in `app/components/windows/` frequently miss explicit `aria-label` attributes (for screen readers) and `title` attributes (for mouse hover tooltips).
**Action:** When creating tooltips for icon-only elements like window controls, prefer using the native HTML `title` attribute alongside `aria-label` to provide context visually on mouse hover and explicitly for screen readers, without needing additional state or dependencies.
