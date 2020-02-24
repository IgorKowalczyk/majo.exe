//---------------------------------------------------------------------
// Actions
// Contains functions for bot actions.
//---------------------------------------------------------------------

const Actions = {};

Actions.DBM = null;

Actions.location = null;

Actions.server = {};
Actions.global = {};

Actions.exists = function(action) {
	if(!action) return false;
	return typeof(this[action]) === 'function';
};

Actions.getLocalFile = function(url) {
	return require('path').join(__dirname, '..', url);
};

Actions.getDBM = function() {
	return this.DBM;
};

Actions.getActionVariable = function(name, defaultValue) {
	if(this[name] === undefined && defaultValue !== undefined) {
		this[name] = defaultValue;
	}
	return this[name];
};

Actions.eval = function(content, cache) {
	if(!content) return false;
	const tempVars = this.getActionVariable.bind(cache.temp);
	let serverVars = null;
	if(cache.server) {
		serverVars = this.getActionVariable.bind(this.server[cache.server.id]);
	}
	const globalVars = this.getActionVariable.bind(this.global);
	const msg = cache.msg;
	const server = cache.server;
	let user = '', member = '', mentionedUser = '', mentionedChannel = '', defaultChannel = '';
	if(msg) {
		user = msg.author;
		member = msg.member;
		if(msg.mentions) {
			mentionedUser = msg.mentions.users.first() || '';
			mentionedChannel = msg.mentions.channels.first() || '';
		}
	}
	if(server) {
		defaultChannel = server.getDefaultChannel();
	}
	try {
		return eval(content);
	} catch(e) {
		console.error(e);
		return false;
	}
};

Actions.evalMessage = function(content, cache) {
	if(!content) return '';
	if(!content.match(/\$\{.*\}/im)) return content;
	return this.eval('`' + content.replace(/`/g,'\\`') + '`', cache);
};

Actions.initMods = function() {
	const fs  = require('fs');
	fs.readdirSync(this.location).forEach(function(file) {
		if(file.match(/\.js/i)) {
			const action = require(require('path').join(this.location, file));
			this[action.name] = action.action;
			if(action.mod) {
				try {
					action.mod(this.DBM);
				} catch(e) {
					console.error(e);
				}
			}
		}
	}.bind(this));
};

Actions.preformActions = function(msg, cmd) {
	if(this.checkConditions(msg, cmd)) {
		this.invokeActions(msg, cmd.actions);
	}
};

Actions.checkConditions = function(msg, cmd) {
	const isServer = Boolean(msg.guild && msg.member);
	const restriction = parseInt(cmd.restriction);
	const permissions = cmd.permissions;
	switch(restriction) {
		case 0:
			if(isServer) {
				return this.checkPermissions(msg, permissions);
			} else {
				return true;
			}
		case 1:
			return isServer && this.checkPermissions(msg, permissions);
		case 2:
			return isServer && msg.guild.owner === msg.member;
		case 3:
			return !isServer;
		case 4:
			const Files = this.DBM.Files;
			return Files.data.settings.ownerId && msg.author.id === Files.data.settings.ownerId;
		default:
			return true;
	}
};

Actions.checkPermissions = function(msg, permissions) {
	const author = msg.member;
	if(!author) return false;
	if(permissions === 'NONE') return true;
	if(msg.guild.owner === author) return true;
	return author.permissions.has([permissions]);
};

Actions.invokeActions = function(msg, actions) {
	const act = actions[0];
	if(!act) return;
	if(this.exists(act.name)) {
		const cache = {
			actions: actions,
			index: 0,
			temp: {},
			server: msg.guild,
			msg: msg
		}
		try {
			this[act.name](cache);
		} catch(e) {
			this.displayError(act, cache, e);
		}
	} else {
		console.error(act.name + " does not exist!");
	}
};

Actions.invokeEvent = function(event, server, temp) {
	const actions = event.actions;
	const act = actions[0];
	if(!act) return;
	if(this.exists(act.name)) {
		const cache = {
			actions: actions,
			index: 0,
			temp: temp,
			server: server
		}
		try {
			this[act.name](cache);
		} catch(e) {
			this.displayError(act, cache, e);
		}
	} else {
		console.error(act.name + " does not exist!");
	}
};

Actions.callNextAction = function(cache) {
	cache.index++;
	const index = cache.index;
	const actions = cache.actions;
	const act = actions[index];
	if(!act) {
		if(cache.callback) {
			cache.callback();
		}
		return;
	}
	if(this.exists(act.name)) {
		try {
			this[act.name](cache);
		} catch(e) {
			this.displayError(act, cache, e);
		}
	} else {
		console.error(act.name + " does not exist!");
	}
};

Actions.getErrorString = function(data, cache) {
	const type = data.permissions ? 'Command' : 'Event';
	return `Error with ${type} "${data.name}", Action #${cache.index + 1}`;
};

Actions.displayError = function(data, cache, err) {
	const dbm = this.getErrorString(data, cache);
	console.error(dbm + ":\n" + err);
	this.DBM.Events.onError(dbm, err.stack ? err.stack : err, cache);
};

Actions.getSendTarget = function(type, varName, cache) {
	const msg = cache.msg;
	const server = cache.server;
	switch(type) {
		case 0:
			if(msg) {
				return msg.channel;
			}
			break;
		case 1:
			if(msg) {
				return msg.author;
			}
			break;
		case 2:
			if(msg && msg.mentions) {
				return msg.mentions.users.first();
			}
			break;
		case 3:
			if(msg && msg.mentions) {
				return msg.mentions.channels.first();
			}
			break;
		case 4:
			if(server) {
				return server.getDefaultChannel();
			}
			break;
		case 5:
			return cache.temp[varName];
			break;
		case 6:
			if(server && this.server[server.id]) {
				return this.server[server.id][varName];
			}
			break;
		case 7:
			return this.global[varName];
			break;
		default:
			break;
	}
	return false;
};

Actions.getMember = function(type, varName, cache) {
	const msg = cache.msg;
	const server = cache.server;
	switch(type) {
		case 0:
			if(msg && msg.mentions && msg.mentions.members) {
				return msg.mentions.members.first();
			}
			break;
		case 1:
			if(msg) {
				return msg.member || msg.author;
			}
			break;
		case 2:
			return cache.temp[varName];
			break;
		case 3:
			if(server && this.server[server.id]) {
				return this.server[server.id][varName];
			}
			break;
		case 4:
			return this.global[varName];
			break;
		default:
			break;
	}
	return false;
};

Actions.getMessage = function(type, varName, cache) {
	const msg = cache.msg;
	const server = cache.server;
	switch(type) {
		case 0:
			if(msg) {
				return msg;
			}
			break;
		case 1:
			return cache.temp[varName];
			break;
		case 2:
			if(server && this.server[server.id]) {
				return this.server[server.id][varName];
			}
			break;
		case 3:
			return this.global[varName];
			break;
		default:
			break;
	}
	return false;
};

Actions.getServer = function(type, varName, cache) {
	const server = cache.server;
	switch(type) {
		case 0:
			if(server) {
				return server;
			}
			break;
		case 1:
			return cache.temp[varName];
			break;
		case 2:
			if(server && this.server[server.id]) {
				return this.server[server.id][varName];
			}
			break;
		case 3:
			return this.global[varName];
			break;
		default:
			break;
	}
	return false;
};

Actions.getRole = function(type, varName, cache) {
	const msg = cache.msg;
	const server = cache.server;
	switch(type) {
		case 0:
			if(msg && msg.mentions && msg.mentions.roles) {
				return msg.mentions.roles.first();
			}
			break;
		case 1:
			if(msg && msg.member && msg.member.roles) {
				return msg.member.roles.first();
			}
			break;
		case 2:
			if(server && server.roles) {
				return server.roles.first();
			}
			break;
		case 3:
			return cache.temp[varName];
			break;
		case 4:
			if(server && this.server[server.id]) {
				return this.server[server.id][varName];
			}
			break;
		case 5:
			return this.global[varName];
			break;
		default:
			break;
	}
	return false;
};

Actions.getChannel = function(type, varName, cache) {
	const msg = cache.msg;
	const server = cache.server;
	switch(type) {
		case 0:
			if(msg) {
				return msg.channel;
			}
			break;
		case 1:
			if(msg && msg.mentions) {
				return msg.mentions.channels.first();
			}
			break;
		case 2:
			if(server) {
				return server.channels.first();
			}
			break;
		case 3:
			return cache.temp[varName];
			break;
		case 4:
			if(server && this.server[server.id]) {
				return this.server[server.id][varName];
			}
			break;
		case 5:
			return this.global[varName];
			break;
		default: 
			break;
	}
	return false;
};

Actions.getList = function(type, varName, cache) {
	const msg = cache.msg;
	const server = cache.server;
	switch(type) {
		case 0:
			if(server) {
				return server.members.array();
			}
			break;
		case 1:
			if(server) {
				return server.channels.array();
			}
			break;
		case 2:
			if(server) {
				return server.roles.array();
			}
			break;
		case 3:
			if(server) {
				return server.emojis.array();
			}
			break;
		case 4:
			return this.DBM.Bot.bot.guilds.array();
			break;
		case 5:
			if(msg && msg.mentions && msg.mentions.members) {
				return msg.mentions.members.first().roles.array();
			}
			break;
		case 6:
			if(msg && msg.member) {
				return msg.member.roles.array();
			}
			break;
		case 7:
			return cache.temp[varName];
			break;
		case 8:
			if(server && this.server[server.id]) {
				return this.server[server.id][varName];
			}
			break;
		case 9:
			return this.global[varName];
			break;
		default: 
			break;
	}
	return false;
};

Actions.getVariable = function(type, varName, cache) {
	const server = cache.server;
	switch(type) {
		case 1:
			return cache.temp[varName];
			break;
		case 2:
			if(server && this.server[server.id]) {
				return this.server[server.id][varName];
			}
			break;
		case 3:
			return this.global[varName];
			break;
		default:
			break;
	}
	return false;
};

Actions.storeValue = function(value, type, varName, cache) {
	const server = cache.server;
	switch(type) {
		case 1:
			cache.temp[varName] = value;
			break;
		case 2:
			if(server) {
				if(!this.server[server.id]) this.server[server.id] = {};
				this.server[server.id][varName] = value;
			}
			break;
		case 3:
			this.global[varName] = value;
			break;
		default:
			break;
	}
};

Actions.executeResults = function(result, data, cache) {
	if(result) {
		const type = parseInt(data.iftrue);
		switch(type) {
			case 0:
				this.callNextAction(cache);
				break;
			case 2:
				const val = parseInt(this.evalMessage(data.iftrueVal, cache));
				const index = Math.max(val - 1, 0);
				if(cache.actions[index]) {
					cache.index = index - 1;
					this.callNextAction(cache);
				}
				break;
			case 3:
				const amnt = parseInt(this.evalMessage(data.iftrueVal, cache));
				const index2 = cache.index + amnt + 1;
				if(cache.actions[index2]) {
					cache.index = index2 - 1;
					this.callNextAction(cache);
				}
				break;
			default:
				break;
		}
	} else {
		const type = parseInt(data.iffalse);
		switch(type) {
			case 0:
				this.callNextAction(cache);
				break;
			case 2:
				const val = parseInt(this.evalMessage(data.iffalseVal, cache));
				const index = Math.max(val - 1, 0);
				if(cache.actions[index]) {
					cache.index = index - 1;
					this.callNextAction(cache);
				}
				break;
			case 3:
				const amnt = parseInt(this.evalMessage(data.iffalseVal, cache));
				const index2 = cache.index + amnt + 1;
				if(cache.actions[index2]) {
					cache.index = index2 - 1;
					this.callNextAction(cache);
				}
				break;
			default:
				break;
		}
	}
};

module.exports = Actions;