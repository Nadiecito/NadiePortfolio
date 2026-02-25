import { chromium } from 'playwright-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({
  executablePath: '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome'
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('file://' + path.join(__dirname, 'index.html'));
await page.waitForTimeout(500);

// Hero section
await page.screenshot({ path: path.join(__dirname, 'preview-hero.png'), clip: { x: 0, y: 0, width: 1280, height: 900 } });

// Scroll to stats
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(200);
await page.screenshot({ path: path.join(__dirname, 'preview-stats.png'), clip: { x: 0, y: 0, width: 1280, height: 900 } });

// Scroll to events
await page.evaluate(() => window.scrollTo(0, 2800));
await page.waitForTimeout(200);
await page.screenshot({ path: path.join(__dirname, 'preview-events.png'), clip: { x: 0, y: 0, width: 1280, height: 900 } });

// Scroll to feria
await page.evaluate(() => document.getElementById('feria').scrollIntoView());
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(__dirname, 'preview-feria.png'), clip: { x: 0, y: 0, width: 1280, height: 900 } });

// Scroll to proposal
await page.evaluate(() => document.getElementById('proposal').scrollIntoView());
await page.waitForTimeout(200);
await page.screenshot({ path: path.join(__dirname, 'preview-proposal.png'), clip: { x: 0, y: 0, width: 1280, height: 900 } });

await browser.close();
console.log('Screenshots saved.');
