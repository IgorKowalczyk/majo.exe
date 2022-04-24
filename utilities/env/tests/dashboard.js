const chalk = require("chalk");

module.exports = async () => {
 if (!process.env.RECAPTCHA_SITE_KEY) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.RECAPTCHA_SITE_KEY!`));
 if (!process.env.RECAPTCHA_SECRET_KEY) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.RECAPTCHA_SECRET_KEY!`));
 if (!process.env.CONTACT_WEBHOOK) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.CONTACT_WEBHOOK!`));
};
