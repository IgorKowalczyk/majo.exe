const { Client } = require('klasa');
const config = require('../config.js');

// Load custom structures
require('./lib/extensions/majoGuild');

// Modify the permission levels
Client.defaultPermissionLevels
	.add(5, (msg) => msg.member && msg.guild.settings.dj && msg.member.roles.has(msg.guild.settings.dj), { fetch: true })
	.add(6, (msg) => msg.member
		&& ((msg.guild.settings.administrator && msg.member.roles.has(msg.guild.settings.administrator))
            || msg.member.permissions.has('MANAGE_GUILD')), { fetch: true });

new Client({
	disabledEvents: [
		'GUILD_BAN_ADD',
		'GUILD_BAN_REMOVE',
		'TYPING_START',
		'CHANNEL_PINS_UPDATE',
		'PRESENCE_UPDATE',
		'USER_UPDATE',
		'MESSAGE_REACTION_ADD',
		'MESSAGE_REACTION_REMOVE',
		'MESSAGE_REACTION_REMOVE_ALL'
	],
	commandEditing: true,
	console: { useColor: true, utc: true },
	pieceDefaults: { commands: { deletable: true, promptLimit: 5, quotedStringSupport: true } },
	prefix: 'majonezie',
	presence: { activity: { name: 'Majonezie, help', type: 'LISTENING' } },
	regexPrefix: /^(hey )?majonezie(,|!)/i
}).login(config.token);
