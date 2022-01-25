const os = require("os");
const chalk = require("chalk")
if(os.platform() != "linux") console.log(chalk.bold(chalk.blue.red(`[DEBUG]`)) + chalk.bold.cyan(` Detected `) + chalk.blue.underline(`${process.platform} ${process.arch}` + chalk.bold.cyan(`! Please use Linux based system to avoid errors`)));
if (!process.env.DASHBOARD == true) throw new Error(`[HOST] Invaild config - not running dashboard! The dashboard config value is set to "${process.env.DASHBOARD}". Change it to "true" to run the dashboard!`);
if (!process.env.DASHBOARD) throw new Error("[HOST] You need to provide Dashboard (Boolean) in .env - DASHBOARD=BOOLEAN");
if (!process.env.SECRET) throw new Error("[HOST] You need to provide Secret in .env - SECRET=YOUR_BOT_SECRET");
if (!process.env.PORT) throw new Error("[HOST] You need to provide Port in .env - PORT=YOUR_WEBSITE_PORT");
if (!process.env.ID) throw new Error("[HOST] You need to provide Discord Bot ID in .env - ID=YOUR_DISCORD_BOT_ID");
if (!process.env.DOMAIN) throw new Error("[HOST] You need to provide Webiste domain in .env - DOMAIN=YOUR_WEBISTE_DOMAIN Note: Only website domain eg. https://example.com without slash at end!");
if (!process.env.CONTACT_WEBHOOK) throw new Error("[HOST] You need to provide Discord Contact Webhook in .env - CONTACT_WEBHOOK=YOUR_WEBHOOK_URL");
if (!process.env.RECAPTCHA_KEY) throw new Error("[HOST] You need to provide Google Recaptcha v2 Token in .env - RECAPTCHA_KEY=YOUR_RECAPTCHA_TOKEN");
