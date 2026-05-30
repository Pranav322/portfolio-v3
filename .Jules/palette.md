## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-05-30 - Window Control Accessibility

**Learning:** Some window components within this application (e.g., ProjectsWindow, AboutWindow, PdfWindow) have window control buttons (minimize, maximize, close) that visually appear interactive but lack semantic accessibility attributes, unlike their counterparts in `BrowserWindow.tsx`. This causes inconsistent screen reader experiences and poor keyboard focus indication. Furthermore, dynamic states like Maximize/Restore need ARIA labels that update accurately.
**Action:** When implementing or updating custom window controls, ensure all interactive buttons include `aria-label`, `title`, and `focus-visible` utility classes. For toggles (like maximize), dynamically update the `aria-label` to reflect the current state (e.g., `isMaximized ? 'Restore' : 'Maximize'`).
