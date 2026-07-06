from pathlib import Path
from playwright.sync_api import sync_playwright

OUTPUT_DIR = Path("/workspace/preview")
OUTPUT_DIR.mkdir(exist_ok=True)

PAGES = [
    ("projects-section", "http://127.0.0.1:8000/index.html#projects", 1280, 900),
    ("reel-rhythm-detail", "http://127.0.0.1:8000/projects/reel-rhythm.html", 1280, 2400),
    ("reel-rhythm-gallery", "http://127.0.0.1:8000/projects/reel-rhythm.html", 1280, 900),
]

with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    page = browser.new_page(device_scale_factor=2)

    for name, url, width, height in PAGES:
        page.set_viewport_size({"width": width, "height": height})
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(500)

        if name == "reel-rhythm-gallery":
            page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.55)")
            page.wait_for_timeout(300)

        page.screenshot(path=str(OUTPUT_DIR / f"{name}.png"), full_page=name == "reel-rhythm-detail")

    browser.close()

print("Screenshots saved to", OUTPUT_DIR)
