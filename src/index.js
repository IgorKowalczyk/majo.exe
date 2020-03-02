import Discord from 'discord.js';
import glob from 'glob';
import {token} from '../token';

export const prefix = '/';

const active = new Map();
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.on('ready', () => {
  bot.user
    .setActivity("'/help' for help", {type: 'PLAYING'})
    .then(() => console.log(`${bot.user.username} is online!`))
    .catch(console.error);
});

glob.sync(`${__dirname}/commands/**/*.js`).forEach(filePath => {
  let commandClass = require(filePath);

  if (commandClass.default) {
    const {name, aliases} = commandClass.default;

    bot.commands.set(name, commandClass.default);
    aliases.forEach(alias => {
      bot.aliases.set(alias, name);
    });
  }
});

bot.on('message', async message => {
  if (message.author.bot || message.channel.type === 'dm') return;
  if (!message.content.startsWith(prefix)) return;

  const messageArray = message.content.split(' ');
  const command = messageArray[0].slice(prefix.length);
  const args = messageArray.slice(1);
  const options = {
    active,
  };
  const foundCommand =
    bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

  if (foundCommand) foundCommand.run(bot, message, args, options);
});

bot.login(token);
