## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Window Controls Accessibility

**Learning:** Window control buttons (Minimize, Maximize, Close) lacking `aria-label` and `title` attributes make navigation difficult for screen reader and mouse users. Native `title` attributes provide free tooltips on hover, and `aria-label` provides screen reader support without needing extra React state or external libraries.
**Action:** Always add `aria-label` and `title` attributes to icon-only buttons to ensure they are accessible and intuitive.
