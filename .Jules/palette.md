## 2025-02-23 - Interactive Dock Accessibility

**Learning:** `framer-motion` components often obscure underlying semantic elements. Using conditional rendering to swap `motion.div` wrappers with semantic `Link` or `button` elements (while preserving layout/animation props) is crucial for keyboard accessibility.
**Action:** When animating interactive elements, always ensure the root interactive element is semantic (`<button>` or `<a>`) and carries the necessary event handlers and ARIA attributes, even if it requires refactoring the animation wrapper.

## 2025-02-23 - Tooltips for Keyboard Focus

**Learning:** Icon-only buttons often rely on hover tooltips for context, leaving keyboard users guessing. Adding `onFocus`/`onBlur` handlers to show the same tooltip on focus bridges this gap without visual clutter.
**Action:** When creating tooltips for icon-only elements, trigger visibility on `hover || focus` and ensure the interactive element itself (not just the inner icon) handles the focus events.

## 2025-02-23 - Dynamic ARIA Attributes for Interactive States

**Learning:** Window control buttons (like Maximize/Restore) that change state visually must also dynamically update their `aria-label` and `title` attributes. Static labels fail to provide accurate context to screen reader users after an interaction.
**Action:** When implementing custom UI controls that toggle state, ensure their accessibility attributes conditionally reflect the current state (e.g., `aria-label={isMaximized ? 'Restore' : 'Maximize'}`) alongside adding `focus-visible` styles.

## 2025-02-23 - File Upload Keyboard Accessibility

**Learning:** Using Tailwind's `hidden` class on `<input type="file">` removes it from the accessibility tree and keyboard tab order, breaking keyboard navigation for custom file uploads.
**Action:** Always use `sr-only` instead of `hidden` for file inputs, and apply `focus-within:ring-2 focus-within:outline-none` to their wrapping `<label>` to provide a visual focus indicator for keyboard users.

## 2025-02-23 - Interactive UI Components Validation

**Learning:** It is easy to assume standard UI controls (like window minimize buttons) are fully interactive when they have hover states and accessibility labels, but they may lack the actual event handlers connecting them to their state logic.
**Action:** Always verify that interactive elements with defined state-mutation functions (e.g., `handleMinimize`) are actually bound to an `onClick` or keyboard event handler, not just visually styled.
