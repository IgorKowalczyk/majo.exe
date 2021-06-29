const Discord = require("discord.js");
const config = require("../../config");
const chalk = require("chalk");

module.exports = async (client, guild) => {
 try {
  console.log(chalk.bold(chalk.blue.bold("[MAJO]")) + chalk.cyan.bold(` New guild joined: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id) + chalk.cyan.bold(") This guild has ") + chalk.blue.bold.underline(guild.memberCount) + chalk.cyan.bold(" members!"));
 } catch (err) {
  console.log(err);
 }
};
