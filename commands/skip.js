module.exports = {
    name: 'skip',
    description: 'Skip next N Songs.',
    cooldown: 5,
	category: "Music",
run: async (client, message, args) => {

        let toSkip = 1 // Default 1
        indexString = args[0]
        var index_to_skip = parseInt(indexString, 10)

        console.log(`Argument Type: ${typeof index_to_skip}`)
        if (typeof index_to_skip !== "number") {
            return message.channel.send("Please enter only Integer values")
        } else {
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
            const serverQueue = message.client.queue.get(message.guild.id);

            var queueSize = serverQueue.songs.length
            if (index_to_skip > queueSize) {
                console.log("ERROR: User attempted to skip more than queue length")
                message.channel.send(`Error: Cannot skip more than the current queue length of ${queueSize}`)
            } else {
                if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');

                serverQueue.songs.splice(0, index_to_skip)
                serverQueue.connection.dispatcher.end()

            }
            
        }

    }

};
