const { Structures } = require('discord.js');
const MusicManager = require('../structures/MusicManager');

module.exports = Structures.extend('Guild', Guild => {
	class majo extends Guild {
		constructor(...args) {
			super(...args);
			this.music = new MusicManager(this);
		}

	}

	return majoGuild;
});
