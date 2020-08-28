const { readdirSync } = require('fs');

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
 console.log('Loading commands...');
 console.log(`Successfully loaded ${client.commands.size} commands!`);
}
