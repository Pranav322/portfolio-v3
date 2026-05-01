## 2024-05-01 - Keyboard Accessibility in Window Controls

**Learning:** Window controls (Minimize, Maximize, Close) in draggable window components often lack ARIA labels, titles, and keyboard focus states, making them inaccessible to keyboard users and screen readers.
**Action:** Always verify that interactive icon-only buttons include `aria-label`, `title`, and `focus-visible:ring-2 focus-visible:outline-none` classes. Applied globally across all `.tsx` window files.
