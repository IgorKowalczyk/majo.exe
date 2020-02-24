module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Edit Role",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Role Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const roles = ['Mentioned Role', '1st Author Role', '1st Server Role', 'Temp Variable', 'Server Variable', 'Global Variable'];
	return `${roles[parseInt(data.storage)]}`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["roleName", "hoist", "mentionable", "color", "position", "storage", "varName"],

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
		Source Role:<br>
		<select id="storage" class="round" onchange="glob.roleChange(this, 'varNameContainer')">
			${data.roles[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div style="padding-top: 8px;">
	Name:<br>
	<input id="roleName" placeholder="Leave blank to not edit!" class="round" type="text">
</div><br>
<div style="float: left; width: 50%;">
	Display Separate from Online Users:<br>
	<select id="hoist" class="round" style="width: 90%;">
		<option value="none" selected>Don't Edit</option>
		<option value="true">Yes</option>
		<option value="false">No</option>
	</select><br>
	Mentionable:<br>
	<select id="mentionable" class="round" style="width: 90%;">
		<option value="none" selected>Don't Edit</option>
		<option value="true">Yes</option>
		<option value="false">No</option>
	</select><br>
</div>
<div style="float: right; width: 50%;">
	Color:<br>
	<input id="color" class="round" type="text" placeholder="Leave blank to not edit!"><br>
	Position:<br>
	<input id="position" class="round" type="text" placeholder="Leave blank to not edit!" style="width: 90%;"><br>
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

	glob.roleChange(document.getElementById('storage'), 'varNameContainer')
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
	const roleData = {};
	if(data.roleName) {
		roleData.name = this.evalMessage(data.roleName, cache);
	}
	if(data.color) {
		roleData.color = this.evalMessage(data.color, cache);
	}
	if(data.position) {
		roleData.position = parseInt(data.position);
	}
	if(data.hoist !== 'none') {
		roleData.hoist = JSON.parse(data.hoist);
	}
	if(data.mentionable !== 'none') {
		roleData.mentionable = JSON.parse(data.mentionable);
	}
	const storage = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	const role = this.getRole(storage, varName, cache);
	if(role && role.edit) {
		role.edit(roleData).then(function(role) {
			this.callNextAction(cache);
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