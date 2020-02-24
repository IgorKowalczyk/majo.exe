const DBM = {
	DiscordJS:  require('discord.js'),
	JIMP: 		require('jimp'),
	Bot: 		require('./Bot.js'),
	Events: 	require('./Events.js'),
	Actions: 	require('./Actions.js'),
	Images: 	require('./Images.js'),
	Files: 		require('./Files.js'),
	Overwrites: require('./Overwrites.js')
};

module.exports = DBM.Bot.DBM = DBM.Events.DBM = DBM.Actions.DBM = DBM.Images.DBM = DBM.Files.DBM = DBM.Overwrites.DBM = DBM;