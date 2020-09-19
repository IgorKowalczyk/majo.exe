module.exports = {
    name: 'volume',
    description: 'Adjusts player volume.',
    cooldown: 5,
    aliases: ['volume', 'vol'],
	category: "Music",
run: async (client, message, args) => {


        if (args) {

            volString = args.join('')

            var volInt = parseInt(volString, 10)


            const whitelist = ["440200028292907048"]

            var isWhitelisted = whitelist.includes(message.author.id)

            if (!isNaN(volInt) && volInt >= 5) {

                if (isWhitelisted) {

                    if (volInt > 999) return message.channel.send("Volume cannot be set above 999")
                    console.log(`volInt: ${volInt}`)
                    const { channel } = message.member.voice;
                    if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
                    const serverQueue = message.client.queue.get(message.guild.id);
                    if (!serverQueue) return message.channel.send('There is nothing playing.');
                    oldVolume = serverQueue.volume
                    if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
                    serverQueue.volume = volInt; // eslint-disable-line
                    serverQueue.connection.dispatcher.setVolumeLogarithmic(volInt / 5);
                    return message.channel.send(`Volume has been set from **${oldVolume}** to: **${volInt}**`);

                } else {

                    return message.channel.send(" You need to be a Premium member to use this feature!")

                }
                

            } else {

                return message.channel.send("Volume command only accepts positive/neutral Numerical input.")

            }
            
        }
    }
};
