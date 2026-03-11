## 2024-05-15 - React Component Render Loop Optimization
**Learning:** Moving static pure data objects and arrays outside of the React component definition prevents them from being recreated on every render. This reduces garbage collection overhead and prevents unnecessary child component re-renders that rely on reference equality.
**Action:** When creating static configuration arrays (like a list of books) or static strings that do not depend on component state or props, declare them as constants outside the main component function block.

## 2024-05-15 - React Hooks in Third-Party Plugin Configurations
**Learning:** While hoisting data outside component scope avoids recreation on every render, you **cannot** do this for third-party functions that internally invoke React Hooks (e.g. `defaultLayoutPlugin()` in `@react-pdf-viewer`). Hoisting it to module scope will cause a fatal "Invalid hook call" crash. Furthermore, you cannot wrap it in `useMemo` either, because React's Rules of Hooks dictate hooks cannot be called inside other hooks like `useMemo` callbacks.
**Action:** When working with third-party plugin initializations, carefully determine if the initializer uses hooks. If it does (or if you are unsure), you must leave its initialization directly in the component body's render path, and rely on pure data hoisting where possible.
