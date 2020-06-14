const Discord = require('discord.js');
const yts = require( 'yt-search' )

module.exports.run = async (client, message, args) => {
yts(args.join(' '), function ( err, r ) {
  if ( err ) {
	return message.channel.send({embed: {
            color: 16734039,
            description: "Something went wrong... :cry:"
        }})
  }
     if (!args[0]) return message.channel.send({embed: {
            color: 16734039,
            description: "Please enter a word to search!"
        }})
    let msg = message.channel.send({embed: {
            color: 16734039,
            description: "🔎 Searching on Youtube..."
        }})
  const videos = r.videos
  videos.forEach( function ( v ) {
    const views = String( v.views ).padStart( 10, ' ' )
	let embed = new Discord.RichEmbed()
      .setTitle("🔎 Youtube Search results:")
      .setDescription(`${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name }`)
      .setColor('RANDOM');
      msg.edit(embed);
  } )
} )
}




module.exports.help = {
    name: "youtube",
    description: "Search on youtube",
    usage: "search <word>",
    type: "Fun"  
}