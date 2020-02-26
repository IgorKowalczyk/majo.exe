const klasa = require('klasa');

module.exports = {

	// Export everything from Klasa
	...klasa,

	// Lib/structures
	MusicCommand: require('./lib/structures/MusicCommand'),
	MusicManager: require('./lib/structures/MusicManager'),

	util: require('./lib/util/util'),

	config: require('../config'),

	// Export Klasa's util as klasaUtil
	klasaUtil: klasa.util
};
