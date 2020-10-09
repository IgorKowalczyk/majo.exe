const genius = require("genius-lyrics")
const G = new genius.Client(process.env.GENIUS_KEY)

module.exports = {
 name: "lyrics",
 description: "Displays lyrics of searched song",
 cooldown: 5,
 aliases: ["lyr"],
 usage: "Video Title & Artist Name" ,
 category: "Music",
 run: async (client, message, args) => {
  G.tracks.search(message.content.split(' ').slice(1).join(' '), {limit: 1})
   .then(results => {
    const song = results[0]
    message.channel.send(`**${song.artist.name} - ${song.title}**\n<${song.url}>`) //song.lyrics
   })
   .catch(err => message.reply(err))
 }
}
