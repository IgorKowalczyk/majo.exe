/* eslint-disable no-undef */
import { chromium } from "playwright";

const endpoints = ["/", "/commands", "/auth/login", "/legal/privacy-policy", "/legal/terms-of-service"];
const user = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 Checkly/portfolio_check";
const defaultURL = process.env.ENVIRONMENT_URL || "https://majoexe.xyz";

const chrome = await chromium.launch();
const context = await chrome.newContext({
 userAgent: user,
 viewport: {
  width: 1920,
  height: 1080,
 },
});

const promises = endpoints.map(async (endpoint, index) => {
 const page = await context.newPage();
 console.log(`Opening page for path ${defaultURL}${endpoint}`);
 try {
  const response = await page.goto(`${defaultURL}${endpoint}`, { waitUntil: "domcontentloaded" });
  if (response.status() > 399) throw new Error(`Failed getting path ${endpoint}! Path response code ${response.status()}`);
  await page.screenshot({ path: `${index}.png`, fullPage: true });
  console.log(`Path ${endpoint} checked! Screenshot saved as ${index}.png`);
 } catch (error) {
  console.error(error);
 } finally {
  await page.close();
 }
});

await Promise.allSettled(promises);

await chrome.close();
