const Discord = require("discord.js")
module.exports = {
    name: "meme",
    aliases: [],
    description: "Mostra um Meme",
    category: "Diversão",
    usage: "meme",
run: async (client, message, args) => {
	api.meme().then(meme => {
			const memeembed = new Discord.MessageEmbed()
				.setTitle(`${meme.title}`)
				.setImage(meme.url)
				.setColor('RANDOM')
				.setURL(meme.link);

			return message.channel.send(memeembed)
		.catch(e => {
			console.error(e);
			message.channel.send("Algo deu errado!");
		});
	});
}
}

