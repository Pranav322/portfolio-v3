from playwright.sync_api import sync_playwright, expect

def verify_window_controls():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        try:
            # Go to the local development server
            page.goto("http://localhost:3000")

            # Wait for the page to load
            page.wait_for_load_state("networkidle")

            # 1. Open "About Me" window
            print("Opening About Me window...")
            about_icon = page.get_by_role("button", name="About Me")
            about_icon.dblclick()

            # Wait for window to appear
            # Use a more specific selector for the window itself, not the icon label
            # Looking for the window header title "About Me" inside the window structure
            window_title = page.locator("div").filter(has_text="About Me").filter(has_text="Full Stack Developer").first

            # Alternatively, look for specific content inside the About window
            about_content = page.locator("text=Full Stack Developer").first
            expect(about_content).to_be_visible()

            # Take screenshot of open window with new controls
            print("Taking screenshot of open About Me window...")
            page.screenshot(path="verification/1_about_window_open.png")

            # 2. Test Minimize
            print("Testing minimize...")
            minimize_btn = page.get_by_label("Minimize window").last
            minimize_btn.click()

            # Verify window content is hidden
            expect(about_content).not_to_be_visible()
            print("Window minimized successfully")

            # 3. Re-open window (testing windowKeys logic)
            print("Re-opening About Me window...")
            about_icon.dblclick()

            # Verify window is visible again
            expect(about_content).to_be_visible()
            print("Window re-opened successfully")

            # 4. Test Maximize
            print("Testing maximize...")
            maximize_btn = page.get_by_label("Maximize window").last
            maximize_btn.click()

            # Verify window is maximized (check width/height or style)
            # Taking screenshot to verify visual maximization
            print("Taking screenshot of maximized window...")
            page.screenshot(path="verification/2_about_window_maximized.png")

            # 5. Test Restore
            print("Testing restore...")
            restore_btn = page.get_by_label("Restore window").last
            restore_btn.click()

            # 6. Test Close
            print("Testing close...")
            close_btn = page.get_by_label("Close window").last
            close_btn.click()

            # Verify window is closed (removed from DOM or hidden)
            expect(about_content).not_to_be_visible()
            print("Window closed successfully")

            print("Verification complete!")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error_state.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_window_controls()
