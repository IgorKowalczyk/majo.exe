const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const table = new ascii("Commands");
table.setHeading('Command', 'Load status');

/* Code by João Victor (https://github.com/Joao-Victor-Liporini). Thanks ❤️ */

module.exports = (client) => {
 readdirSync('./commands/').forEach(file => {
   let pull = require(`../commands/${file}`);
   try {
    if (typeof pull.name != 'string' || typeof pull != 'object') throw new Error('Missing a name or name is not a string');
    if (pull.category && typeof pull.category !== 'string') throw new Error('Category is not a string');
    if (pull.description && typeof pull.description !== 'string') throw new Error('Description is not a string');
    if (pull.usage && typeof pull.usage !== 'string') throw new Error('Usage is not a string');
    if (pull.name) {
     client.commands.set(pull.name, pull);
     table.addRow(file, '√');
    }
    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
   } catch (error) {
    table.addRow(file, `X -> ${error}`);
    continue;
   }
 });
 console.log(table.toString());
}
