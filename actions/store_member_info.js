module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Store Member Info",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Member Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const members = ['Mentioned User', 'Command Author', 'Temp Variable', 'Server Variable', 'Global Variable'];
	const info = ['Member Object', 'Member ID', 'Member Username', 'Member Display Name', 'Member Color', 'Member Server', 'Member Last Message', 'Member Highest Role', 'Member Hoist Role', 'Member Color Role', 'Member Is Owner?', 'Member Is Muted?', 'Member Is Deafened?', 'Member Is Bannable?', 'Member Game', 'Member Status', 'Member Avatar URL'];
	return `${members[parseInt(data.member)]} - ${info[parseInt(data.info)]}`;
},

//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	const info = parseInt(data.info);
	let dataType = 'Unknown Type';
	switch(info) {
		case 0:
			dataType = "Server Member";
			break;
		case 1:
			dataType = "Server Member ID";
			break;
		case 2:
		case 3:
			dataType = "Text";
			break;
		case 4:
			dataType = "Color";
			break;
		case 5:
			dataType = "Server";
			break;
		case 6:
			dataType = "Message";
			break;
		case 7:
		case 8:
		case 9:
			dataType = "Role";
			break;
		case 10:
		case 11:
		case 12:
		case 13:
			dataType = "Boolean";
			break;
		case 14:
		case 15:
			dataType = "Text";
			break;
		case 16:
			dataType = "Image URL";
			break;
	}
	return ([data.varName2, dataType]);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["member", "varName", "info", "storage", "varName2"],

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
		Source Member:<br>
		<select id="member" class="round" onchange="glob.memberChange(this, 'varNameContainer')">
			${data.members[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div>
	<div style="padding-top: 8px; width: 70%;">
		Source Info:<br>
		<select id="info" class="round">
			<option value="0" selected>Member Object</option>
			<option value="1">Member ID</option>
			<option value="2">Member Username</option>
			<option value="3">Member Display Name</option>
			<option value="4">Member Color</option>
			<option value="14">Member Game</option>
			<option value="15">Member Status</option>
			<option value="16">Member Avatar URL</option>
			<option value="5">Member Server</option>
			<option value="6">Member Last Message</option>
			<option value="17">Member Role List</option>
			<option value="7">Member Highest Role</option>
			<option value="8">Member Hoist Role</option>
			<option value="9">Member Color Role</option>
			<option value="10">Member Is Owner?</option>
			<option value="11">Member Is Muted?</option>
			<option value="12">Member Is Deafened?</option>
			<option value="13">Member Is Bannable?</option>
		</select>
	</div>
</div><br>
<div>
	<div style="float: left; width: 35%;">
		Store In:<br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer2" style="float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName2" class="round" type="text"><br>
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

	glob.memberChange(document.getElementById('member'), 'varNameContainer');
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
	const member = parseInt(data.member);
	const varName = this.evalMessage(data.varName, cache);
	const info = parseInt(data.info);
	const mem = this.getMember(member, varName, cache);
	if(!mem) {
		this.callNextAction(cache);
		return;
	}
	const server = cache.server;
	let result;
	switch(info) {
		case 0:
			result = mem;
			break;
		case 1:
			result = mem.id;
			break;
		case 2:
			if(mem.user) {
				result = mem.user.username;
			}
			break;
		case 3:
			result = mem.displayName;
			break;
		case 4:
			result = mem.displayHexColor;
			break;
		case 5:
			result = mem.guild;
			break;
		case 6:
			result = mem.lastMessage;
			break;
		case 7:
			result = mem.highestRole;
			break;
		case 8:
			result = mem.hoistRole;
			break;
		case 9:
			result = mem.colorRole;
			break;
		case 10:
			if(mem.guild && mem.guild.owner) {
				result = Boolean(mem.id === mem.guild.owner.id);
			}
			break;
		case 11:
			result = Boolean(mem.mute);
			break;
		case 12:
			result = Boolean(mem.deaf);
			break;
		case 13:
			result = Boolean(mem.bannable);
			break;
		case 14:
			if(mem.presence && mem.presence.game) {
				result = mem.presence.game.name;
			}
			break;
		case 15:
			if(mem.presence) {
				const status = mem.presence.status;
				if(status === 'online') result = 'Online';
				else if(status === 'offline') result = 'Offline';
				else if(status === 'idle') result = 'Idle';
				else if(status === 'dnd') result = 'Do Not Disturb';
			}
			break;
		case 16:
			if(mem.user) {
				result = mem.user.displayAvatarURL;
			}
			break;
		case 17:
			if(mem.roles) {
				result = mem.roles.array();
			}
			break;
		default:
			break;
	}
	if(result !== undefined) {
		const storage = parseInt(data.storage);
		const varName2 = this.evalMessage(data.varName2, cache);
		this.storeValue(result, storage, varName2, cache);
	}
	this.callNextAction(cache);
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