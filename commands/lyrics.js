
const cheerio = require('cheerio')
const Genius = require('genius-api')
const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')
const genius = new Genius(process.env.GENIUS_KEY)

module.exports = {
    name: 'lyrics',
    description: 'Displays lyrics of searched song.',
    cooldown: 5,
    aliases: ['lyr'],
    usage: 'Video Title & Artist Name' ,
	category: "Music",
    execute(message, args) {

        //Function to search the Genius API and grab the first song
        function genius_search_song(song_string) {
            genius.search(song_string)
                .then(function (response) {


                    song = response.hits[0].result

                    genius.getSongLyrics(song.url)


                })
        }


        //Parses the HTML for the lyrics under the lyrics class
        function parseSongHTML(htmlText) {

            try {

            } catch (err) {
                console.error(err)
            }
            const $ = cheerio.load(htmlText)
            const lyrics = $(`div[class="lyrics"]`).text().trim()
            console.log(lyrics)
            console.log(typeof lyrics)
            if (!lyrics) return message.channel.send("Could not obtain lyrics. Ensure you have entered the Artist")
            if (lyrics.length > 3000) return message.channel.send("Could not provide lyrics as they were over character allowance")

            return message.channel.send(lyrics, {split: true, code: true })
        }


        //Adds method to Genius class for getting the song lyrics
        Genius.prototype.getSongLyrics = function getSongLyrics(geniusUrl) {
            return fetch(geniusUrl, { method: 'GET' })
                .then(response => {
                    if (response.ok) return response.text()
                    throw new Error('Could not get song URL...')
                })
            .then(parseSongHTML)
        }


        if (args.length > 0) {

            searchArgs = args.join(' ')
            console.log(`Genius searching for... ${searchArgs}`)
            try {

                genius_search_song(searchArgs)

            } catch (err) {
                console.error(err)
            }

        } else {

        
           return message.channel.send("Please supply some arguments")

        }

    }
};
