# Modern Interactive Portfolio 🌟

[![Live Demo](https://img.shields.io/badge/demo-live-green?style=for-the-badge)](https://dualportfolioo.vercel.app)
![Technology](https://img.shields.io/badge/tech-next.js%2C%20framer%20motion%2C%20tailwind-cyan?style=for-the-badge)

A futuristic portfolio experience blending GUI and CLI interfaces with dynamic window management.

![Main Interface](/screenshots/desktopui.png) _Desktop interface with floating dock and windows_

![Terminal Interface](/screenshots/terminalui.png) _Interactive terminal with command history_

## Key Features ✨

- **Hybrid Interface** - Switch between GUI and CLI modes
- **Window System** - Resizable, draggable application windows
- **Visual Effects** -
  - ✨ Neumorphic design elements
  - 🌈 Smooth animations
  - 🎮 Interactive desktop experience
- **Real Integrations** -
  - 🎵 Spotify playback status
  - 📚 PDF book viewer
  - 🌐 Custom browser implementation

## Usage 🖱️

1. **Dock Interactions**

   - Click icons to open applications
   - Right-click for context menu (WIP)
   - Hover for magnified effect

2. **Window Management**

   - Drag title bars to move
   - Click corners to resize
   - Use window controls:
     - 🗖 Maximize/Restore
     - 🗕 Minimize
     - ✕ Close

3. **Terminal Commands**

```bash
> help - List available commands
> projects - Show coding projects
> skills - Display technical capabilities
> clear - Reset terminal
```

## Development 🛠️

```bash
npm install
npm run dev
```

## Configuration 🔧

Customize in `app/config.ts`:

- Window default sizes
- Desktop shortcuts
- Visual themes
- API endpoints

---

Made with ❤️ using Next.js + Tailwind + Framer Motion
