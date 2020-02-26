const { MusicCommand } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			usage: '[force]',
			description: 'Skip the current song.',
			requireMusic: true
		});
	}

	async run(msg, [force]) {
		const { music } = msg.guild;

		if (music.queue.length < 1) throw '`❌` | No Songs in the queue to skip!';
		if (music.voiceChannel.members.size > 4) {
			if (force) {
				if (!await msg.hasAtLeastPermissionLevel(5)) throw 'You can\'t execute this command with the force flag. You must be at least a Moderator Member.';
			} else {
				const response = this.handleSkips(music, msg.author.id);
				if (response) return msg.sendMessage(response);
			}
		}

		await msg.sendMessage(`⏭ Skipped ${music.queue[0].title}`);
		music.skip(true);
		return null;
	}

	handleSkips(musicInterface, user) {
		if (!musicInterface.queue[0].skips) musicInterface.queue[0].skips = new Set();
		if (musicInterface.queue[0].skips.has(user)) return 'You have already voted to skip this song.';
		musicInterface.queue[0].skips.add(user);
		const members = musicInterface.voiceChannel.members.size - 1;
		return this.shouldInhibit(members, musicInterface.queue[0].skips.size);
	}

	shouldInhibit(total, size) {
		if (total <= 3) return true;
		return size >= total * 0.4 ? false : `🔸 | Votes: ${size} of ${Math.ceil(total * 0.4)}`;
	}

};
