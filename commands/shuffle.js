module.exports = {
    name: 'shuffle',
    description: 'Shuffles Queue.',
    cooldown: 3,
	category: "Music",
run: async (client, message, args) => {

        //Works off the Fisher Yates Algorithm
        function shuffle(queue) {

            for (let i = queue.songs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = queue.songs[i]
                queue.songs[i] = queue.songs[j]
                queue.songs[j] = temp
            }

        }

        //Gets current queue
        serverQueue = message.client.queue.get(message.guild.id)

        //Checks Queue
        if (!serverQueue.songs[0]) return message.channel.send("No song currently playing in this guild")

        //Grabs Voice Channel
        const { channel } = message.member.voice

        //Checks channel
        if (!channel) return message.channel.send("You need to be in a voice channel to shuffle music")

        //Shuffles Queue and moves to next song
        shuffle(serverQueue);
        serverQueue.connection.dispatcher.end()
        return message.channel.send("The Queue is now shuffled")
    }
};
