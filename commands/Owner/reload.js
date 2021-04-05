const fs = require('fs');

module.exports = {
    name: "reload",
    aliases: ["r", "rd"],
    description: "Recarrega os comandos do bot",
    category: "Dono",
    usage: "rd <command>",

run: (client, message, args) => {
  if(message.author.id !== "506505845215985674") return message.channel.send({embed: {
    color: 16734039,
    description: "Apenas o proprietário do Bot pode usar este comando."
   }});
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send({embed: {
        color: 16734039,
        description: `Não há comando com nome ou alias \`${commandName}\`, ${message.author}!` 
       }});
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send({embed: {
          color: 16734039,
          description: `Comando \`${command.name}\` foi recarregado!`
         }});
		} catch (error) {
			console.error(error);
			message.channel.send({embed: {
        color: 16734039,
        description: `Houve um erro ao recarregar um comando \`${command.name}\`:\n\`${error.message}\``
       }});
		}
	},
};
