## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2024-04-10 - Adding aria-label and title to OS Window Controls

**Learning:** For icon-only desktop/OS window controls (Minimize, Maximize, Close), it is essential to include both `aria-label` (for screen readers) and `title` (for native HTML hover tooltips). Without both, visually capable users using a mouse get no interaction context (tooltip), and screen reader users get no context. This app mimics an OS interface, so standard OS-level tooltip behavior is expected.
**Action:** When creating or modifying window components or icon-only system controls, always ensure both `aria-label` and `title` attributes are present to provide dual-modality context.
