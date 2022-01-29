// DEPRECATED

const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async (client) => {
 const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
 commandFiles.map((value) => {
  const file = require(value);
  const splitted = value.split("/");
  const directory = splitted[splitted.length - 2];
  if (typeof file.name != "string" || typeof file != "object") throw new Error("Missing a name or name is not a string");
  if (file.category && typeof file.category !== "string") throw new Error("Missing command category or category is not a string");
  if (file.description && typeof file.description !== "string") throw new Error("Missing command description or description is not a string");
  if (file.usage && typeof file.usage !== "string") throw new Error("Missing command usage example or example is not a string");
  if (file.name) {
   const properties = { directory, ...file };
   client.commands.set(file.name, properties);
  }
  if (file.aliases && Array.isArray(file.aliases)) {
   file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
  }
 });
};
