const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const chalk = require("chalk");
const table = new ascii("Majo.exe commands");
table.setHeading("Command", "Category", "Load status");
table.setTitleAlign(table.CENTER);

/* Code by João Victor (https://github.com/Joao-Victor-Liporini). Thanks ❤️ */
module.exports = (client) => {
 readdirSync("./commands/").forEach((dir) => {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
  for (let file of commands) {
   let pull = require(`../commands/${dir}/${file}`);
   try {
    if (typeof pull.name != "string" || typeof pull != "object") throw new Error("Missing a name or name is not a string");
    if (pull.category && typeof pull.category !== "string") throw new Error("Category is not a string");
    if (pull.description && typeof pull.description !== "string") throw new Error("Description is not a string");
    if (pull.usage && typeof pull.usage !== "string") throw new Error("Usage is not a string");
    if (pull.name && pull.category) {
     client.commands.set(pull.name, pull);
     table.addRow(pull.name, pull.category, "OK");
    }

    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
   } catch (error) {
    table.addRow(file, "-", `ERROR -> ${error}`);
   }
  }
 });
 console.log(chalk.blue("Loading commands..."));
 console.log(table.toString());
 console.log(chalk.blue("Successfully loaded ") + chalk.blue.underline(`${client.commands.size}`) + chalk.blue(" commands!"));
};
