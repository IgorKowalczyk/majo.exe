module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Store Server Info",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Server Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const servers = ['Current Server', 'Temp Variable', 'Server Variable', 'Global Variable'];
	const info = ['Server Object', 'Server ID', 'Server Name', 'Server Name Acronym', 'Server Region', 'Server Icon URL', 'Server Verification Level', 'Server Default Channel', 'Server AFK Channel', 'Server System Channel', 'Server Default Role', 'Server Owner Member', 'Server Bot Member Object', 'Server Channel List', 'Server Role List', 'Server Member List', 'Server Emoji List'];
	return `${servers[parseInt(data.server)]} - ${info[parseInt(data.info)]}`;
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
			dataType = 'Server';
			break;
		case 1:
			dataType = 'Server ID';
			break;
		case 2:
		case 3:
		case 4:
			dataType = 'Text';
			break;
		case 5:
			dataType = 'Image URL';
			break;
		case 6:
			dataType = 'Number';
			break;
		case 7:
		case 8:
		case 9:
			dataType = 'Channel';
			break;
		case 10:
			dataType = 'Role';
			break;
		case 11:
		case 12:
			dataType = 'Server Member';
			break;
		case 13:
			dataType = 'Channel List';
			break;
		case 14:
			dataType = 'Role List';
			break;
		case 15:
			dataType = 'Server Member List';
			break;
		case 16:
			dataType = 'Emoji List';
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

fields: ["server", "varName", "info", "storage", "varName2"],

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
		Source Server:<br>
		<select id="server" class="round" onchange="glob.serverChange(this, 'varNameContainer')">
			${data.servers[isEvent ? 1 : 0]}
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
			<option value="0" selected>Server Object</option>
			<option value="1">Server ID</option>
			<option value="2">Server Name</option>
			<option value="3">Server Name Acronym</option>
			<option value="4">Server Region</option>
			<option value="5">Server Icon URL</option>
			<option value="6">Server Verification Level</option>
			<option value="7">Server Default Channel</option>
			<option value="8">Server AFK Channel</option>
			<option value="9">Server System Channel</option>
			<option value="10">Server Default Role</option>
			<option value="11">Server Owner Member</option>
			<option value="12">Server Bot Member Object</option>
			<option value="13">Server Channel List</option>
			<option value="14">Server Role List</option>
			<option value="15">Server Member List</option>
			<option value="16">Server Emoji List</option>
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

	glob.serverChange(document.getElementById('server'), 'varNameContainer')
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
	const server = parseInt(data.server);
	const varName = this.evalMessage(data.varName, cache);
	const info = parseInt(data.info);
	const targetServer = this.getServer(server, varName, cache);
	if(!targetServer) {
		this.callNextAction(cache);
		return;
	}
	let result;
	switch(info) {
		case 0:
			result = targetServer;
			break;
		case 1:
			result = targetServer.id;
			break;
		case 2:
			result = targetServer.name;
			break;
		case 3:
			result = targetServer.nameAcronym;
			break;
		case 4:
			result = targetServer.region;
			break;
		case 5:
			result = targetServer.iconURL;
			break;
		case 6:
			result = targetServer.verificationLevel;
			break;
		case 7:
			result = targetServer.defaultChannel;
			break;
		case 8:
			result = targetServer.afkChannel;
			break;
		case 9:
			result = targetServer.systemChannel;
			break;
		case 10:
			result = targetServer.defaultRole;
			break;
		case 11:
			result = targetServer.owner;
			break;
		case 12:
			result = targetServer.me;
			break;
		case 13:
			result = targetServer.channels.array();
			break;
		case 14:
			result = targetServer.roles.array();
			break;
		case 15:
			result = targetServer.members.array();
			break;
		case 16:
			result = targetServer.emojis.array();
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