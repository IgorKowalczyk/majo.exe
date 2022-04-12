const chalk = require("chalk");
const fetch = require("node-fetch");

module.exports = async (client) => {
 console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Registering slash commands..."));
 await client.application.commands.set(client.slash_commands_array);
 //console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Setting permissions for slash commands (/)... Please wait"));
 await fetch(`https://discordapp.com/api/v9/applications/${client.config.id}/commands`, {
  method: "GET",
  headers: {
   authorization: `Bot ${client.token}`,
  },
 })
  .then((res) => res.json())
  .then((body) => {
   if (body) {
    body.forEach((obj) => {
     if (obj.default_permission != true) {
      const cmd = client.slash_commands.get(obj.name);
      client.application.commands.permissions.add({ command: obj.id, permissions: cmd.permissions, guild: client.config.support_server_id });
     }
    });
   }
  });

 //console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Setting permissions for slash commands (/) done!"));
 console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully registered " + chalk.blue.underline(`${client.slash_commands.size}`) + " (total: " + chalk.blue.underline(client.all_commands) + ") slash commands! (/)"));
};
