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

## 2024-09-07 - Window Controls Accessibility

**Learning:** Window control buttons (minimize, maximize, close) in this application do not use a centralized, shared UI component. Instead, the markup and logic for these headers are duplicated individually across each window component in `app/components/windows/`. This architectural pattern means that accessibility improvements, such as adding `aria-label`, `title`, or `focus-visible` states to window controls, must be audited and manually propagated across every single window file to ensure consistent UX.
**Action:** When implementing or fixing UI and accessibility issues on structural elements like window headers, always audit the entire `app/components/windows/` directory to ensure all instances are consistently updated, rather than assuming a single shared component exists.
