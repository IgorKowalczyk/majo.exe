const {readdirSync} = require('fs');
const chalk = require("chalk");

module.exports = (client) => {
 const commands = readdirSync('./commands/').forEach(file => {
  const pull = require(`../commands/${file}`);
  client.commands.set(pull.name, pull);
  if(pull.aliases) {
   pull.aliases.forEach(alias => {
    client.aliases.set(alias, pull.name);
   });
  }
 });
 console.log(chalk.blue("Loading commands..."));
 console.log(chalk.blue("Successfully loaded ") + chalk.blue.underline(`${client.commands.size}`) + chalk.blue(" commands!"));
}
