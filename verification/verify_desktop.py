from playwright.sync_api import sync_playwright
import time

def verify_desktop():
    print("Launching browser...")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 720})

        try:
            print("Navigating to http://localhost:3000")
            page.goto("http://localhost:3000")

            # Wait for desktop icons to load
            print("Waiting for 'About Me' icon...")
            page.wait_for_selector('button[aria-label="About Me"]')

            print("Waiting for 'Settings' icon...")
            page.wait_for_selector('button[aria-label="Settings"]')

            # Wait for floating dock items (which also have aria-labels)
            # The floating dock items are at the bottom.
            # Using specific aria-label for Dock item
            print("Waiting for 'Home' dock item...")
            # Note: FloatingDock items might be links or buttons depending on href
            # Home has href="#" so it's a button? No, let's check Navbar.tsx
            # href: '#' -> it is a button in IconContainer if isLink is false
            # "Home" href="#" -> isLink is false?
            # In floating-dock.tsx: const isLink = isExternal || (href && href !== '#');
            # So if href='#', isLink is false. So it renders as button.
            page.wait_for_selector('button[aria-label="Home"]')

            # Wait a bit for animations/images
            time.sleep(2)

            print("Taking screenshot...")
            page.screenshot(path="verification/desktop_view.png")
            print("Screenshot saved to verification/desktop_view.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_desktop()
