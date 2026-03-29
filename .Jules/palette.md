## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-03-29 - Window Controls Tooltips and ARIA Labels
**Learning:** Icon-only window control buttons (Minimize, Maximize, Close) inside Framer Motion `<motion.button>` wrappers lack hover context for mouse users and semantic context for screen readers if missing standard attributes. Since these elements are highly reusable across multiple window components (`AboutWindow`, `SpotifyWindow`, etc.), any missing accessibility attributes affect the entire application interface.
**Action:** Always ensure that icon-only buttons (like `IconMinus`, `IconSquare`, `IconX`) used for global controls include explicitly defined `aria-label` and `title` attributes. Provide descriptive text (e.g., "Minimize") to simultaneously fulfill screen reader requirements and visual tooltip expectations.
