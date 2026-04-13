## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Accessible Window Controls
**Learning:** Common window control icons (Minimize, Maximize, Close) are frequently implemented as icon-only buttons (`IconMinus`, `IconSquare`, `IconX`). These elements are functionally opaque to screen readers and lack visual context for keyboard users without hover. Native HTML attributes can quickly bridge this gap across a component library.
**Action:** Always ensure that icon-only window control elements include explicit `aria-label` attributes for screen readers and `title` attributes for native tooltip support on hover, applying dynamic labels based on state (e.g., `isMaximized ? 'Restore' : 'Maximize'`) where applicable.
