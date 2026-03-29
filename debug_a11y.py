import time
from playwright.sync_api import sync_playwright

def debug():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        print("Navigating to local dev server...")
        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")

        print("Taking debug screenshot...")
        page.screenshot(path="debug_a11y.png")
        print("Success! Screenshot saved to debug_a11y.png")

        # Output all roles available to help us identify how to open a window
        html = page.content()
        with open("page_source.html", "w") as f:
            f.write(html)
        print("Page source written to page_source.html")

        browser.close()

if __name__ == "__main__":
    debug()
