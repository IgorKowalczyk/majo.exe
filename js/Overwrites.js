//---------------------------------------------------------------------
// Overwrites
// Creates extra functions directory within DiscordJS
//---------------------------------------------------------------------

const DiscordJS = require('discord.js');

const Overwrites = {};

Overwrites.DBM = null;

//---------------------------------------------------------------------
// GuildMember
//---------------------------------------------------------------------

const GuildMember = DiscordJS.GuildMember;

GuildMember.prototype.data = function(name, defaultValue) {
	const id = this.id;
	const data = Overwrites.DBM.Files.data.players;
	if(data[id] === undefined) {
		if(defaultValue === undefined) {
			return null;
		} else {
			data[id] = {};
		}
	}
	if(data[id][name] === undefined && defaultValue !== undefined) {
		data[id][name] = defaultValue;
	}
	return data[id][name];
};

GuildMember.prototype.setData = function(name, value) {
	const id = this.id;
	const data = Overwrites.DBM.Files.data.players;
	if(data[id] === undefined) {
		data[id] = {};
	}
	data[id][name] = value;
	Overwrites.DBM.Files.saveData('players');
};

GuildMember.prototype.addData = function(name, value) {
	const id = this.id;
	const data = Overwrites.DBM.Files.data.players;
	if(data[id] === undefined) {
		data[id] = {};
	}
	if(data[id][name] === undefined) {
		this.setData(name, value);
	} else {
		this.setData(name, this.data(name) + value);
	}
};

//---------------------------------------------------------------------
// User
//---------------------------------------------------------------------

const User = DiscordJS.User;

User.prototype.data = GuildMember.prototype.data;
User.prototype.setData = GuildMember.prototype.setData;
User.prototype.addData = GuildMember.prototype.addData;

//---------------------------------------------------------------------
// Guild
//---------------------------------------------------------------------

const Guild = DiscordJS.Guild;

Guild.prototype.getDefaultChannel = function() {
	let channel = this.channels.get(this.id);
	if(!channel) {
		this.channels.array().forEach(function(c) {
			if(c.type !== 'voice') {
				if(!channel) {
					channel = c;
				} else if(channel.position > c.position) {
					channel = c;
				}
			}
		});
	}
	return channel;
};

Guild.prototype.data = function(name, defaultValue) {
	const id = this.id;
	const data = Overwrites.DBM.Files.data.servers;
	if(data[id] === undefined) {
		if(defaultValue === undefined) {
			return null;
		} else {
			data[id] = {};
		}
	}
	if(data[id][name] === undefined && defaultValue !== undefined) {
		data[id][name] = defaultValue;
	}
	return data[id][name];
};

Guild.prototype.setData = function(name, value) {
	const id = this.id;
	const data = Overwrites.DBM.Files.data.servers;
	if(data[id] === undefined) {
		data[id] = {};
	}
	data[id][name] = value;
	Overwrites.DBM.Files.saveData('servers');
};

Guild.prototype.addData = function(name, value) {
	const id = this.id;
	const data = Overwrites.DBM.Files.data.servers;
	if(data[id] === undefined) {
		data[id] = {};
	}
	if(data[id][name] === undefined) {
		this.setData(name, value);
	} else {
		this.setData(name, this.data(name) + value);
	}
};

module.exports = Overwrites;