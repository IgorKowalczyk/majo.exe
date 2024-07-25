import { test } from "@playwright/test";

test.setTimeout(210000);
test.use({ actionTimeout: 20000 });

const endpoints = ["/", "/commands", "/auth/login", "/legal/privacy-policy", "/legal/terms-of-service"];
const defaultURL = process.env.ENVIRONMENT_URL || "https://nyxia.vercel.app";
const dimensions = [
 { width: 1920, height: 1080, name: "large" },
 { width: 1000, height: 800, name: "middle" },
 { width: 600, height: 800, name: "small" },
];

test.describe("emulate different viewport sizes", async () => {
 for (const { name, width, height } of dimensions) {
  test("take screenshot on " + name + " viewport", async ({ browser }) => {
   for (const endpoint of endpoints) {
    const page = await browser.newPage({
     extraHTTPHeaders: {
      "x-vercel-protection-bypass": process.env.VERCEL_BYPASS,
     },
     viewport: {
      height,
      width,
     },
    });

    console.log(`Opening page for path ${defaultURL}${endpoint}`);
    try {
     const response = await page.goto(`${defaultURL}${endpoint}`, { waitUntil: "domcontentloaded" });
     if (response.status() > 399) throw new Error(`Failed getting path ${endpoint}! Path response code ${response.status()}`);

     await page.screenshot({ path: `${name}_${endpoint.replace(/\//g, "")}.png`, fullPage: true });

     console.log(`Path ${endpoint} checked! Screenshot saved as ${name}_${endpoint.replace(/\//g, "")}.png`);
    } catch (error) {
     console.error(error);
    } finally {
     await page.close();
    }
   }
  });
 }
});
