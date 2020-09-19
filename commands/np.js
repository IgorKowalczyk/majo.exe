module.exports = {
	name: 'np',
	description: 'Shows current song.',
	cooldown: 5,
	category: "Music",
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}** by **${serverQueue.songs[0].channel}**`);
	}
};
