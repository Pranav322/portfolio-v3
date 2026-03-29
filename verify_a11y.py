import time
from playwright.sync_api import sync_playwright, expect

def verify_window_controls():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use desktop viewport as instructed in memory
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        print("Navigating to local dev server...")
        # Add retries for the dev server to start
        max_retries = 30
        for i in range(max_retries):
            try:
                page.goto("http://localhost:3000")
                break
            except Exception as e:
                if i == max_retries - 1:
                    print(f"Failed to connect: {e}")
                    raise
                print(f"Waiting for server... ({i+1}/{max_retries})")
                time.sleep(2)

        print("Waiting for page load...")
        page.wait_for_load_state("networkidle")

        print("Opening About window...")
        about_icon = page.get_by_text("About Me")

        about_icon.wait_for(state="visible", timeout=10000)
        about_icon.click()
        time.sleep(0.5)
        about_icon.dblclick()

        # Wait for window to appear
        print("Waiting for About window controls...")

        minimize_btn = page.locator('button[aria-label="Minimize"]').first
        minimize_btn.wait_for(state="visible", timeout=5000)

        maximize_btn = page.locator('button[aria-label="Maximize"]').first
        maximize_btn.wait_for(state="visible", timeout=5000)

        close_btn = page.locator('button[aria-label="Close"]').first
        close_btn.wait_for(state="visible", timeout=5000)

        print("Hovering minimize to show tooltip...")
        minimize_btn.hover()
        time.sleep(1)

        print("Taking screenshot...")
        page.screenshot(path="verification_a11y.png")
        print("Success! Screenshot saved to verification_a11y.png")

        min_title = minimize_btn.get_attribute("title")
        assert min_title == "Minimize", f"Expected title 'Minimize', got {min_title}"

        max_title = maximize_btn.get_attribute("title")
        assert max_title == "Maximize", f"Expected title 'Maximize', got {max_title}"

        close_title = close_btn.get_attribute("title")
        assert close_title == "Close", f"Expected title 'Close', got {close_title}"

        print("DOM assertions passed!")

        browser.close()

if __name__ == "__main__":
    verify_window_controls()
