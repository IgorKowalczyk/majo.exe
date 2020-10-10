const chalk = require('chalk');
const delay = require('delay');
const { embedDurationLength } = require('../../config/settings.js');
const formatDuration = require("../../handlers/formatduration.js");
const { MessageEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the bot is currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send('Loading please wait...');

        const player = client.music.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send("No song/s currently playing within this guild.");
        
        const { title, duration, uri, identifier, requester, author } = player.queue[0];

        const CurrentDuration = formatDuration(player.position);
		const Duration = formatDuration(duration);
        const thumbnail = `https://img.youtube.com/vi/${identifier}/hqdefault.jpg`;
        const part = Math.floor((player.position / duration) * embedDurationLength);
        const uni = player.playing ? '🔴 |' : '⏸️ |';

        const embed = new MessageEmbed()
            .setAuthor(player.playing ? 'Now Playing...' : 'Song Pause..', "https://cdn.discordapp.com/emojis/741605543046807626.gif")
            .setColor('#000001')
            .setDescription(`**[${title}](${uri})**`)
            .setThumbnail(thumbnail)
            .addField('Author:', author, true)
            .addField('Requester:', requester, true)
			.addField(`Current Duration: \`[${CurrentDuration} / ${Duration}]\``, `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(embedDurationLength - part)}\`\`\``)
            .setTimestamp();
            
        await delay(2000);
            msg.edit('', embed)
            console.log(chalk.magenta(`  [Command]: Nowplaying used by ${message.author.tag} from ${message.guild.name}`));
    }
}