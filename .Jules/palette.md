## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.
## 2025-03-08 - Icon-Only Buttons Missing ARIA Labels\n**Learning:** The window management components in `app/components/windows/*` (Minimize, Maximize, Close controls) use framer-motion `motion.button` wrappers containing only Tabler Icons (e.g., `IconMinus`, `IconSquare`, `IconX`). Since these buttons lack text content and omit `aria-label` attributes, they provide zero context to screen reader users about their function.\n**Action:** When using icon-only buttons, especially in repetitive patterns like window controls across multiple components, always provide an explicit `aria-label` (e.g., `aria-label="Minimize"`) to ensure accessibility.
