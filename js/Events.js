//---------------------------------------------------------------------
// Events
// Handles the various events that occur.
//---------------------------------------------------------------------

const Events = {};

Events.DBM = null;

let $evts = null;

Events.data = [
	[],[],[],[],['guildCreate', 0, 0, 1],['guildDelete', 0, 0, 1],['guildMemberAdd', 1, 0, 2],['guildMemberRemove', 1, 0, 2],['channelCreate', 1, 0, 2, true, 'arg1.type !== \'text\''],['channelDelete', 1, 0, 2, true, 'arg1.type !== \'text\''],['roleCreate', 1, 0, 2],['roleDelete', 1, 0, 2],['guildBanAdd', 3, 0, 1],['guildBanRemove', 3, 0, 1],['channelCreate', 1, 0, 2, true, 'arg1.type !== \'voice\''],['channelDelete', 1, 0, 2, true, 'arg1.type !== \'voice\''],['emojiCreate', 1, 0, 2],['emojiDelete', 1, 0, 2],['guildUpdate', 1, 3, 3],['messageDelete', 1, 0, 2, true],['guildMemberUpdate', 1, 3, 4],['presenceUpdate', 1, 3, 4],['voiceStateUpdate', 1, 3, 4],['channelUpdate', 1, 3, 4, true],['channelPinsUpdate', 1, 0, 2, true],['roleUpdate', 1, 3, 4],['messageUpdate', 1, 3, 4, true],['emojiUpdate', 1, 3, 4],[],[],['messageReactionRemoveAll', 1, 0, 2, true],['guildMemberAvailable', 1, 0, 2],['guildMembersChunk', 1, 0, 3],['guildMemberSpeaking', 1, 3, 2],[],[],['guildUnavailable', 1, 0, 1]
];

Events.registerEvents = function(bot) {
	$evts = this.DBM.Bot.$evts;
	for(let i = 0; i < this.data.length; i++) {
		const d = this.data[i];
		if(d.length > 0 && $evts[String(i)]) {
			bot.on(d[0], this.callEvents.bind(this, String(i), d[1], d[2], d[3], !!d[4], d[5]));
		}
	}
	if($evts["28"]) bot.on('messageReactionAdd', this.onReaction.bind(this, "28"));
	if($evts["29"]) bot.on('messageReactionRemove', this.onReaction.bind(this, "29"));
	if($evts["34"]) bot.on('typingStart', this.onTyping.bind(this, "34"));
	if($evts["35"]) bot.on('typingStop', this.onTyping.bind(this, "35"));
};

Events.callEvents = function(id, temp1, temp2, server, mustServe, condition, arg1, arg2) {
	if(mustServe) {
		if(temp1 > 0 && !arg1.guild) return;
		if(temp2 > 0 && !arg2.guild) return;
	}
	if(condition && eval(condition)) return;
	const events = $evts[id];
	if(!events) return;
	for(let i = 0; i < events.length; i++) {
		const event = events[i];
		const temp = {};
		if(event.temp) temp[event.temp] = this.getObject(temp1, arg1, arg2);
		if(event.temp2) temp[event.temp2] = this.getObject(temp2, arg1, arg2);
		this.DBM.Actions.invokeEvent(event, this.getObject(server, arg1, arg2), temp);
	}
};

Events.getObject = function(id, arg1, arg2) {
	switch(id) {
		case 1: return arg1;
		case 2: return arg1.guild;
		case 3: return arg2;
		case 4: return arg2.guild;
	}
	return undefined;
};

Events.onInitialization = function(bot) {
	const events = $evts["1"];
	for(let i = 0; i < events.length; i++) {
		const event = events[i];
		const temp = {};
		const servers = bot.guilds.array();
		for(let i = 0; i < servers.length; i++) {
			const server = servers[i];
			if(server) {
				this.DBM.Actions.invokeEvent(event, server, temp);
			}
		}
	}
};

Events.setupIntervals = function(bot) {
	const events = $evts["3"];
	for(let i = 0; i < events.length; i++) {
		const event = events[i];
		const temp = {};
		const time = event.temp ? parseFloat(event.temp) : 60;
		bot.setInterval(function() {
			const servers = bot.guilds.array();
			for(let i = 0; i < servers.length; i++) {
				const server = servers[i];
				if(server) {
					this.DBM.Actions.invokeEvent(event, server, temp);
				}
			}
		}.bind(this), time * 1000);
	}
};

Events.onReaction = function(id, reaction, user) {
	const events = $evts[id];
	if(!events) return;
	if(!reaction.message || !reaction.message.guild) return;
	const server = reaction.message.guild;
	const member = server.member(user);
	if(!member) return;
	for(let i = 0; i < events.length; i++) {
		const event = events[i];
		const temp = {};
		if(event.temp) temp[event.temp] = reaction;
		if(event.temp2) temp[event.temp2] = member;
		this.DBM.Actions.invokeEvent(event, server, temp);
	}
};

Events.onTyping = function(id, channel, user) {
	const events = $evts[id];
	if(!events) return;
	if(!channel.guild) return;
	const server = channel.guild;
	const member = server.member(user);
	if(!member) return;
	for(let i = 0; i < events.length; i++) {
		const event = events[i];
		const temp = {};
		if(event.temp) temp[event.temp] = channel;
		if(event.temp2) temp[event.temp2] = member;
		this.DBM.Actions.invokeEvent(event, server, temp);
	}
};

Events.onError = function(text, text2, cache) {
	const events = $evts["37"];
	if(!events) return;
	for(let i = 0; i < events.length; i++) {
		const event = events[i];
		const temp = {};
		if(event.temp) temp[event.temp] = text;
		if(event.temp2) temp[event.temp2] = text2;
		this.DBM.Actions.invokeEvent(event, cache.server, temp);
	}
};

module.exports = Events;