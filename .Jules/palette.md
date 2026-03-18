## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Accessibility of Icon-Only Window Controls
**Learning:** Icon-only window controls (Minimize, Maximize, Close) lack context for screen readers and keyboard users who cannot easily discover their purpose without tooltips or labels. Providing both \`aria-label\` and native \`title\` attributes solves this for both user bases.
**Action:** Always add \`aria-label\` and \`title\` to icon-only buttons like window controls to ensure they are accessible to screen readers and provide hover tooltips for visual users. When mass-updating with regex, account for arrow functions in event handlers.
