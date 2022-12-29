const { chromium } = require("playwright");
const endpoints = ["/", "/repositories", "/blog", "/uses"];

(async () => {
 const chrome = await chromium.launch();
 const user = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 Checkly/portfolio_check";
 const context = await chrome.newContext({
  userAgent: user,
  viewport: {
   width: 1920,
   height: 1080,
  },
 });

 const defaultURL = process.env.ENVIRONMENT_URL || "https://beta.majoexe.xyz";

 await Promise.all(
  endpoints.map(async (endpoint, index) => {
   const page = await context.newPage();
   console.log(`Opening page for path ${defaultURL}${endpoint}`);
   await page.goto(`${defaultURL}${endpoint}`, { waitUntil: "domcontentloaded" }).then(async (response) => {
    if (response.status() > 399) throw new Error(`Failed getting path ${endpoint}! Path response code ${response.status()}`);
    await page.screenshot({ path: `${index}.png`, fullPage: true }).then(async () => {
     await page.close();
     console.log(`Path ${endpoint} checked! Screenshot saved as ${index}.png`);
    });
   });
  })
 );

 await chrome.close();
})();
