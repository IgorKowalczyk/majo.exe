//---------------------------------------------------------------------
// Files
// Contains functions for file management.
//---------------------------------------------------------------------

const Files = {};

Files.DBM = null;

Files.data = {};
Files.writers = {};
Files.crypto = require('crypto');
Files.dataFiles = [
	'commands.json',
	'events.json',
	'settings.json',
	'players.json',
	'servers.json'
];

Files.initStandalone = function() {
	const {Actions, Bot} = this.DBM;
	const fs = require('fs');
	const path = require('path');
	Actions.location = path.join(__dirname, '..', 'actions');
	if(fs.existsSync(Actions.location)) {
		Actions.initMods();
		this.readData(Bot.init.bind(Bot));
	} else {
		console.error('Please copy the "Actions" folder from the Discord Bot Maker directory to this bot\'s directory: \n' + this.DBM.Actions.location);
	}
};

Files.initBotTest = function(content) {
	const {Actions, Bot} = this.DBM;
	if(content) {
		Actions.location = String(content);
		Actions.initMods();
		this.readData(Bot.init.bind(Bot));

		const _console_log = console.log;
		console.log = function() {
			process.send(String(arguments[0]));
			_console_log.apply(this, arguments);
		};

		const _console_error = console.error;
		console.error = function() {
			process.send(String(arguments[0]));
			_console_error.apply(this, arguments);
		};
	}
};

Files.readData = function(callback) {
	const fs = require('fs');
	const path = require('path');
	let max = this.dataFiles.length;
	let cur = 0;
	for(let i = 0; i < max; i++) {
		fs.readFile(path.join(__dirname, '..', 'data', this.dataFiles[i]), function(error, content) {
			const filename = this.dataFiles[i].slice(0, -5);
			let data;
			try {
				if(typeof content !== 'string' && content.toString) content = content.toString();
				data = JSON.parse(this.decrypt(content));
			} catch(e) {
				console.error(`There was issue parsing ${this.dataFiles[i]}!`);
				return;
			}
			this.data[filename] = data;
			if(++cur === max) {
				callback();
			}
		}.bind(this));
	}
};

Files.saveData = function(file, callback) {
	const fs = require('fs');
	const path = require('path');
	const data = this.data[file];
	if(!this.writers[file]) {
		const fstorm = require('fstorm');
		this.writers[file] = fstorm(path.join(__dirname, '..', 'data', file + '.json'))
	}
	this.writers[file].write(this.encrypt(JSON.stringify(data)), function() {
		if(callback) {
			callback();
		}
	}.bind(this));
};

Files.initEncryption = function() {
	try {
		this.password = require('discord-bot-maker');
	} catch(e) {
		this.password = '';
	}
};

Files.encrypt = function(text) {
	if(this.password.length === 0) return text;
	const cipher = this.crypto.createCipher('aes-128-ofb', this.password);
	let crypted = cipher.update(text, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
};

Files.decrypt = function(text) {
	if(this.password.length === 0) return text;
	const decipher = this.crypto.createDecipher('aes-128-ofb', this.password);
	let dec = decipher.update(text, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
};

Files.initEncryption();

module.exports = Files;