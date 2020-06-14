const Discord = require('discord.js');
const yts = require( 'yt-search')

module.exports.run = async (client, message, args) => {

yts(args[0], function ( err, r ) {

     if (!args[0]) return message.channel.send({embed: {
            color: 16734039,
            description: "Please enter a word to search!"
        }})

  const videos = r.videos
  const playlists = r.playlists || r.lists
  const channels = r.accounts || r.channels
  videos.forEach( function ( video ) {
    const views = String( video.views ).padStart( 5, ' ' )
    const title = video.title
    const timestamp = video.timestamp
    const seconds = video.seconds
   let embed = new Discord.RichEmbed()
      .setTitle("🔎 Youtube Search results:")
      .setDescription(`${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name }`)
      .setColor('RANDOM');
      message.channel.send(embed);
  } )
} )


}

module.exports.help = {
    name: "youtube",
    description: "Search on youtube",
    usage: "search <word>",
    type: "Fun"  
}