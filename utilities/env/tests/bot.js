const chalk = require("chalk");

module.exports = () => {
 if (!process.env.SUPPORT_SERVER_ID) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.SUPPORT_SERVER_ID!`));
};
