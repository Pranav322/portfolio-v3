
from playwright.sync_api import sync_playwright

def verify_about_window():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        # Grant clipboard permissions
        context = browser.new_context(
            permissions=["clipboard-read", "clipboard-write"],
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()

        try:
            # Navigate to the app
            print("Navigating to app...")
            page.goto("http://localhost:3000")

            # Wait for loading
            page.wait_for_load_state("networkidle")

            # Open About Me window - target desktop icon specifically
            print("Opening About Me window...")
            # Using a more specific selector to avoid ambiguity if multiple exist
            about_icon = page.locator('button[aria-label="About Me"]').first
            about_icon.click()
            about_icon.dblclick()

            # Wait for window to appear
            print("Waiting for About Me window...")
            # Wait for the window header or title
            page.wait_for_selector("text=About Me", state="visible", timeout=10000)

            # Locate the email button
            email_button = page.locator('button[aria-label="Copy email address"]')

            # Verify initial state
            print("Verifying initial state...")
            assert "pranavdotdev@gmail.com" in email_button.inner_text()

            # Click the button
            print("Clicking email button...")
            email_button.click()

            # Verify copied state
            print("Verifying copied state...")
            # Wait for the text change
            page.wait_for_selector("text=Copied!", state="visible", timeout=2000)

            # Take screenshot of the "Copied!" state
            print("Taking screenshot...")
            page.screenshot(path="verification_result.png")

            # Verify ARIA labels on controls
            print("Verifying window controls ARIA labels...")
            assert page.locator('button[aria-label="Minimize window"]').count() > 0
            # Use 'or' logic for maximize/restore as state might vary
            maximize_restore = page.locator('button[aria-label="Maximize window"]').or_(page.locator('button[aria-label="Restore window"]'))
            assert maximize_restore.count() > 0
            assert page.locator('button[aria-label="Close window"]').count() > 0

            print("Verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification_failure.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_about_window()
