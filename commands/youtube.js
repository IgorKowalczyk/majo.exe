const Discord = require('discord.js');
const yts = require( 'yt-search' )

module.exports.run = async (client, message, args) => {

yts( 'superman theme', function ( err, r ) {
  const videos = r.videos
  const playlists = r.playlists || r.lists
  const channels = r.accounts || r.channels

  videos.forEach( function ( video ) {
    const views = String( video.views ).padStart( 10, ' ' )
    const title = video.title
    const timestamp = video.timestamp
    const seconds = video.seconds
    console.log( `${ views } | ${ title } (${ timestamp }) | ${ video.author.name }` )
  } )
} )


}

module.exports.help = {
    name: "youtube",
    description: "Search on youtube",
    usage: "search <word>",
    type: "Fun"  
}