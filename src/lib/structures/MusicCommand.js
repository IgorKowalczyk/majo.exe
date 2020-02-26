const { Command } = require('klasa');

class MusicCommand extends Command {

	constructor(client, store, file, core, { requireMusic = false, ...options }) {
		if ('runIn' in options) options.runIn = ['text'];

		super(client, store, file, core, options);
		this.requireMusic = requireMusic;
	}

}

MusicCommand.YOUTUBE_REGEXP = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/\S*(?:(?:\/e(?:mbed)?)?\/|watch\/?\?(?:\S*?&?v=))|youtu\.be\/)([\w-]{11})(?:[^\w-]|$)/;

module.exports = MusicCommand;
