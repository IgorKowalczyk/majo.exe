import glob from 'glob';

// If a user does /champion /help it does not run the Help class
// This is because /champion already uses the second parameter
// This appears to be the case for all commands that can be given more than 1 argument

export default class Help {
  static name = 'help';
  static aliases = ['h', 'commands'];
  static description =
    "Displays the help command,\n for general help type '/help' lol";

  static run(bot, message, args) {
    const commandsObj = glob
      .sync('src/commands/*/*.js')
      .reduce((commandsObj, filePath) => {
        const category = filePath.split('/')[2];
        const file = filePath.split('/')[3].split('.')[0];

        if (!Array.isArray(commandsObj[category])) commandsObj[category] = [];

        commandsObj[category].push(file);
        return commandsObj;
      }, {});

    if (args == '') {
      const helpEmbed = {
        color: 0x738ad7,
        description: 'List of available commands',
        thumbnail: {
          url: message.guild.iconURL,
        },
        author: {
          name: 'General help',
          icon_url: bot.user.displayAvatarURL,
        },
        fields: [
          {
            name: 'Admin commands',
            value: `/${commandsObj.admin
              .map(command => command + '\n')
              .join('/')}`,
          },
          {
            name: 'General commands',
            value: `/${commandsObj.general
              .map(command => command + '\n')
              .join('/')}`,
          },
          {
            name: 'League commands',
            value: `/${commandsObj.league
              .map(command => command + '\n')
              .join('/')}`,
          },
          {
            name: 'Music commands',
            value: `/${commandsObj.music
              .map(command => command + '\n')
              .join('/')}`,
          },
          {
            name: 'Reddit commands',
            value: `/${commandsObj.reddit
              .map(command => command + '\n')
              .join('/')}`,
          },
        ],
      };
      message.channel.send({embed: helpEmbed});
    }

    if (args[0]) {
      let command = args[0];
      if (bot.commands.has(command)) {
        command = bot.commands.get(command);
        const commandEmbed = {
          color: 0x738ad7,
          thumbnail: {
            url: message.guild.iconURL,
          },
          author: {
            name: `Command /${command.name}`,
            icon_url: bot.user.displayAvatarURL,
          },
          fields: [
            {
              name: `${command.name}`,
              value: `${command.description}`,
            },
            {
              name: '\u200b',
              value: '\u200b',
            },
            {
              name: 'Aliases',
              value: `/${command.aliases.map(alias => alias + '\n').join('/') ||
                'none'}`,
            },
          ],
        };
        message.channel.send({embed: commandEmbed});
      }
    }
  }
}
