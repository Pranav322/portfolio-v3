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

## 2025-02-23 - Accessibility Batch Updates

**Learning:** When making accessibility updates (like adding ARIA attributes to a specific button), it is critical to ensure that any associated interaction handlers (e.g., `onClick`) are not only added to the element, but also correctly defined and scoped within the component. The `request_code_review` tool highlighted a regression where `onClick={handleMinimize}` was added, but assumed to exist, potentially breaking the build.
**Action:** When adding missing interaction handlers alongside accessibility attributes, always manually verify (e.g., using `grep`) that the handler function is actually declared within the component's scope before committing the change.
