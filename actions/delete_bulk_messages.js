module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Delete Bulk Messages",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Messaging",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const channels = ['Same Channel', 'Mentioned Channel', '1st Server Channel', 'Temp Variable', 'Server Variable', 'Global Variable'];
	return `Delete ${data.count} messages from ${channels[parseInt(data.channel)] || 'Nothing'}`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["channel", "count", "condition", "custom", "varName"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions. 
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information, 
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use. 
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels, 
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
<div>
	<div style="float: left; width: 35%;">
		Source Channel:<br>
		<select id="channel" class="round" onchange="glob.channelChange(this, 'varNameContainer')">
			${data.channels[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div style="padding-top: 8px;">
	Amount to Delete:<br>
	<input id="count" class="round" type="text" style="width: 90%;"><br>
</div>
<div>
	<div style="float: left; width: 35%;">
		Delete Condition:<br>
		<select id="condition" class="round" onchange="glob.onChange2(this)">
			<option value="0" selected>None</option>
			<option value="1">Has Author</option>
			<option value="2">Custom</option>
		</select>
	</div>
	<div id="varNameContainer2" style="display: none; float: right; width: 60%;">
		Code:<br>
		<input id="custom" class="round" type="text"><br>
	</div>
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
	const {glob, document} = this;

	glob.onChange2 = function(event) {
		const value = parseInt(event.value);
		const varNameInput = document.getElementById("varNameContainer2");
		if(value === 0) {
			varNameInput.style.display = "none";
		} else {
			varNameInput.style.display = null;
		}
	};

	glob.channelChange(document.getElementById('channel'), 'varNameContainer')
	glob.onChange2(document.getElementById('condition'));
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter, 
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const data = cache.actions[cache.index];
	const server = cache.server;
	let source;
	const channel = parseInt(data.channel);
	const msg = cache.msg;
	const varName = this.evalMessage(data.varName, cache);
	switch(channel) {
		case 0:
			if(msg) {
				source = msg.channel;
			}
			break;
		case 1:
			if(msg && msg.mentions) {
				source = msg.mentions.channels.first();
			}
			break;
		case 2:
			if(server) {
				source = server.channels.first();
			}
			break;
		case 3:
			source = cache.temp[varName];
			break;
		case 4:
			if(server && this.server[server.id]) {
				source = this.server[server.id][varName];
			}
			break;
		case 5:
			source = this.global[varName];
			break;
	}
	if(source && source.fetchMessages) {
		const count = Math.min(parseInt(this.evalMessage(data.count, cache)), 100);
		source.fetchMessages({limit: count, before: msg.id}).then(function(messages) {
			const condition = parseInt(data.condition);
			if(condition === 1) {
				let author;
				try {
					author = this.eval(data.custom, cache);
				} catch(e) {
					this.displayError(data, cache, e);
					author = null;
				}
				if(author) {
					messages.filter(function(element) {
						return element.author === author || element.member === author;
					}, this);
				}
			} else if(condition === 2) {
				const cond = data.custom;
				messages.filter(function(message) {
					let result = false;
					try {
						result = !!this.eval(cond, cache);
					} catch(e) {}
					return result;
				}, this);
			}
			source.bulkDelete(messages).then(function() {
				this.callNextAction(cache);
			}.bind(this)).catch(this.displayError.bind(this, data, cache));
		}.bind(this)).catch(this.displayError.bind(this, data, cache));
	} else {
		this.callNextAction(cache);
	}
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module