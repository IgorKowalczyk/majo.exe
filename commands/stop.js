module.exports = {
	name: 'stop',
	description: 'Stops Music',
    cooldown: 5,
    aliases: ['clear', 'quit', 's'],
	category: "Music",
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
	}
};
