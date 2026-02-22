from playwright.sync_api import sync_playwright
import time

def verify_window_controls():
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        # Force a desktop viewport
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        print("Navigating to http://localhost:3000...")
        try:
            page.goto("http://localhost:3000", timeout=30000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            browser.close()
            return

        print("Page loaded. Checking for 'About Me' icon...")

        # Wait for the DOM to settle
        time.sleep(2)

        # Check if we need to switch to GUI mode
        try:
            # Look for the 'About Me' icon directly
            # Note: aria-label="About Me"
            about_icon = page.locator('button[aria-label="About Me"]')

            if not about_icon.is_visible():
                print("'About Me' icon not visible. Trying to toggle GUI mode...")
                # Try to find the toggle button
                toggle_btn = page.locator('button[aria-label="Toggle GUI/CLI mode"]')
                if toggle_btn.is_visible():
                    toggle_btn.click()
                    print("Clicked toggle button. Waiting...")
                    time.sleep(2)
                else:
                    print("Could not find toggle button either.")

            # Try to double click 'About Me'
            if about_icon.is_visible():
                print("Double-clicking 'About Me' icon...")
                about_icon.dblclick()
            else:
                print("Still cannot find 'About Me' icon.")
                raise Exception("'About Me' icon not found")

        except Exception as e:
            print(f"Error interacting with desktop: {e}")
            page.screenshot(path="verification/error_interaction.png")
            browser.close()
            return

        print("Waiting for About Window...")
        try:
            # Wait for the window title or content to appear
            # The title bar contains "About Me"
            page.wait_for_selector('text="About Me"', timeout=10000)

            # Wait for animation
            time.sleep(2)

            print("Verifying window controls...")
            # Use aria-labels which we added
            minimize_btn = page.locator('button[aria-label="Minimize"]')
            maximize_btn = page.locator('button[aria-label="Maximize"]')
            close_btn = page.locator('button[aria-label="Close"]')

            if minimize_btn.is_visible():
                print("✅ Minimize button found")
            else:
                print("❌ Minimize button NOT found")

            if maximize_btn.is_visible():
                print("✅ Maximize button found")
            else:
                print("❌ Maximize button NOT found")

            if close_btn.is_visible():
                print("✅ Close button found")
            else:
                print("❌ Close button NOT found")

            # Test minimize button
            print("Clicking Minimize button...")
            minimize_btn.click()
            time.sleep(1)

            # Check if window is gone (or minimized)
            # The AboutWindow returns WindowWrapper which returns null if minimized?
            # AboutWindow implementation:
            # if (isMinimized) return null; in some windows, but AboutWindow calls WindowWrapper with onMinimize.
            # WindowWrapper renders:
            # {shouldBeFullscreen && children} OR Resizable around children.
            # Wait, WindowWrapper itself doesn't hide on minimize unless the parent does?
            # Let's check AboutWindow again.

            # AboutWindow:
            # const handleMinimize = () => { setIsMinimized(true); };
            # ... onMinimize={handleMinimize}
            # return <WindowWrapper ...> ... </WindowWrapper>

            # It does NOT verify isMinimized in render!
            # Wait, AboutWindow.tsx:
            #   const handleMinimize = () => {
            #     setIsMinimized(true);
            #   };
            #   return (
            #     <WindowWrapper ... > ...

            # It seems AboutWindow doesn't return null when isMinimized is true!
            # Let me check `SettingsWindow.tsx`
            #   if (isMinimized) { return null; }

            # So AboutWindow might NOT hide when minimized? That would be a bug I didn't fix, or maybe I missed it.
            # Let's check AboutWindow.tsx content again.

            # Take a screenshot of the window
            page.screenshot(path="verification/about_window_controls.png")
            print("Screenshot saved to verification/about_window_controls.png")

        except Exception as e:
            print(f"Error validating window: {e}")
            page.screenshot(path="verification/error_window.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_window_controls()
