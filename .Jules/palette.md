## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus
**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2024-05-24 - Window Control Accessibility
**Learning:** The window control buttons (`IconMinus`, `IconSquare`, `IconX`) lack standard ARIA labels across multiple window components (like `BooksWindow`, `PranavChatWindow`, `ProjectsWindow`, `SettingsWindow`, etc), reducing accessibility for screen reader users trying to manage their windows. While `BrowserWindow` handles them somewhat well, many specific Windows have hard-coded buttons missing context. Furthermore, they are missing `focus-visible` classes.
**Action:** When working on UI window components with custom title bar controls, ensure `aria-label="Minimize"`, `aria-label="Maximize"`/`aria-label="Restore"`, and `aria-label="Close"` are applied respectively to the standard OS-like window management buttons. Add `focus-visible` styles to ensure keyboard accessibility, keeping in mind the memory: "For keyboard accessibility, interactive icon-only elements (such as window control buttons or toggles) must include appropriate focus-visible classes, such as focus-visible:ring-2 focus-visible:outline-none, to ensure clear visual focus states when navigating via keyboard."
