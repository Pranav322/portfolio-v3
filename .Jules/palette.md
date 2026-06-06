## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Window Controls Baseline Standard

**Learning:** Multiple window components (e.g., BooksWindow, ProjectsWindow, SettingsWindow) contain duplicate implementations of window control buttons (IconMinus, IconSquare, IconX), leading to inconsistent application of baseline accessibility standards across UI variants.
**Action:** All window components (e.g., BrowserWindow, PdfWindow, AboutWindow, PranavChatWindow, SkillsWindow) have been updated to include accessible header controls. Future window implementations must adhere to this baseline by applying aria-label, title, and focus-visible classes to their control buttons, and ensuring interaction handlers are properly bound. Future UX work should refactor them into a shared, accessible component.
