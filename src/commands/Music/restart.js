const { MusicCommand } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			permissionLevel: 6,
			description: 'Clears the music handler.'
		});
	}

	async run(msg) {
		msg.guild.music.clear();
		if (msg.guild.me.voice.channel) await msg.guild.me.voice.channel.leave();
		return msg.sendMessage('Successfully restarted the music module.');
	}

};
