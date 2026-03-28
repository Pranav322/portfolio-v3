from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(3000)

    # We use a broader locator and wait for visibility, since desktop & mobile docks are separate components
    dock_item = page.locator(".fixed.z-40.bottom-4").locator("button[aria-label='Settings']").first
    dock_item.hover()
    page.wait_for_timeout(1000)

    # Move mouse around to trigger useMotionValue updates
    page.mouse.move(500, 500)
    page.wait_for_timeout(500)
    page.mouse.move(600, 500)
    page.wait_for_timeout(500)

    # Take screenshot
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
