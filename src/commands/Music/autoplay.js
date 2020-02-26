const { MusicCommand } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			description: 'Toggle the autoplayer.',
			extendedHelp: [
				'NOTE! This command does not make Majo.exe play a song from the nowhere, it tells her whether to play the first',
				'non-duplicated (in a range of 10 songs) song from the related videos she has fetched in the latest added song.',
				'That is to say, Sneyra receives a list of 10-15 related songs, she also saves the 10 previous played songs. If',
				'the song has already been played, it will be skipped and check the next, until finding a song that has not been',
				'played recently. This allows two things:\n- 1: Play music unlimitedly without playing the same song twice.\n- 2:',
				'Find new songs from YouTube.'
			].join(' '),
			requireMusic: true
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		const enabled = !music.autoplay;

		music.autoplay = enabled;

		return msg.sendMessage(enabled
			? `Sure thing! I'll keep playing decks until you get bored!`
			: `I stopped auto-playing songs, just make sure to give me some songs later!`);
	}

};
