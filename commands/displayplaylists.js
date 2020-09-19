playlistsJSON = require('./playlists.json')
const { MessageEmbed } = require ('discord.js')

module.exports = {
 name: 'playlists',
 description: 'Shows Saved Playlists.',
 cooldown: 5,
 category: "Music",
 run: async (client, message, args) => {

        if (!args) {
            page = 0
        } else {
            page = args[0]
        }
                       
        playlistSize = playlistsJSON.playlists.length
        maxPage = playlistSize / 10
        maxPage = maxPage.toFixed(0)

        if (page > maxPage) return message.channel.send(`Sorry that number is too high for the page limit of ${maxPage}`)
        if (playlistSize < 1) return message.channel.send("ERROR: Could not detect any saved playlists for this guild");

        if (playlistSize > 10) {
            listLength = 10
        } else {
            listLength = playlistSize
        }
        

        const playlistsEmbed = new MessageEmbed()
            .setTitle('Saved Playlists')
            .setColor("RANDOM")
            .setDescription(`Saved playlists for ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())
            .setFooter(message.client.footerMSG, message.client.user.displayAvatarURL())


        for (i = 0; i < listLength; i++) {
            playlistsEmbed.addField(`#${i+1}`, `Name: **${playlistsJSON.playlists[i].name}** || URL: **${playlistsJSON.playlists[i].url}**`)
        }

        message.channel.send(playlistsEmbed)
    }
};
