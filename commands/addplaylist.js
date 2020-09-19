const playlistsJSONRaw = require('./playlists.json')
const fs = require('fs')

module.exports = {
    name: 'addplaylist',
    description: 'Saves playlist using name and PlaylistURL.',
    cooldown: 5,
    usage: `<playlistName , playlistURL> NOTE : No Spaces in playlistName`, 
    aliases: ['playlistadd', 'saveplaylist', 'save'],
	category: "Music",
    execute(message, args) {


        // args = [BestOfSongs, www.youtube.com//wadawdawdawd]

        playlistName = args[0]
        playlistURL = args[1]
        playlistCheck = new RegExp('^https://www.youtube.com/playlist');

        if (!playlistCheck.test(playlistURL)) return message.channel.send("Please enter a valid playlist URL. Ensure name has no spaces");

        //Checks for possible duplicates
        for (i = 0; i < playlistsJSONRaw.playlists.length; i++) {

            if (playlistsJSONRaw.playlists[i].name == playlistName || playlistsJSONRaw.playlists[i].url == playlistURL) {
                return message.channel.send(`ERROR : There is already an existing playlist with that Name/URL`)
            }

        }

        //Creates playlist structure
        playlist = {
            name: playlistName,
            url: playlistURL
        }


        console.log(`Playlist Information Gathered as : ${playlist}`)


        //Defines

        let obj = playlistsJSONRaw

        obj.playlists.push(playlist)
        console.log(obj)
        var json = JSON.stringify(obj);

        fs.readFile('commands/playlists.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data); //now it an object
                //console.log(`Playlists Array gathered : ( ${obj.playlists} )`)
                obj.playlists.push(playlist); //add some data
                //console.log(`Playlists Array updated : ( ${obj.playlists} )`)
                json = JSON.stringify(obj); //convert it back to json
                //console.log(`Converted to JSON : ( ${json} )`)
                fs.writeFile('commands/playlists.json', json, 'utf8', function callback(err) {

                    if(err) console.log(err)
                }); // write it back 
            }
        });

    }
};