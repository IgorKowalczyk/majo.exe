const Discord = require("discord.js");
const config = require("../../config");

module.exports = async (client, guild) => {
 try {
  if(!guild) return;
  console.log(chalk.bold(chalk.blue.bold("[MAJO]")) + chalk.cyan.bold(` I have been removed from: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id) + chalk.cyan.bold(")"));
 } catch (err) {
  console.log(err);
 }
};
