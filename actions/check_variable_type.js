module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Check Variable Type",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Conditions",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const results = ["Continue Actions", "Stop Action Sequence", "Jump To Action", "Jump Forward Actions"];
	return `If True: ${results[parseInt(data.iftrue)]} ~ If False: ${results[parseInt(data.iffalse)]}`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["storage", "varName", "comparison", "iftrue", "iftrueVal", "iffalse", "iffalseVal"],

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
		Variable:<br>
		<select id="storage" class="round" onchange="glob.refreshVariableList(this)">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList">
	</div>
</div><br><br><br>
<div style="padding-top: 8px; width: 80%;">
		Variable Type to Check:<br>
		<select id="comparison" class="round">
			<option value="0" selected>Number</option>
			<option value="1">String</option>
			<option value="2">Image</option>
			<option value="3">Member</option>
			<option value="4">Message</option>
			<option value="5">Text Channel</option>
			<option value="6">Voice Channel</option>
			<option value="7">Role</option>
			<option value="8">Server</option>
			<option value="9">Emoji</option>
		</select>
</div><br>
<div>
	${data.conditions[0]}
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

	glob.onChangeTrue(document.getElementById('iftrue'));
	glob.onChangeFalse(document.getElementById('iffalse'));
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
	const type = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	const variable = this.getVariable(type, varName, cache);
	let result = false;
	if(variable) {
		const DiscordJS = this.getDBM().DiscordJS;
		const compare = parseInt(data.comparison);
		switch(compare) {
			case 0:
				result = Boolean(typeof(variable) === 'number');
				break;
			case 1:
				result = Boolean(typeof(variable) === 'string');
				break;
			case 2:
				result = Boolean(variable instanceof this.getDBM().JIMP);
				break;
			case 3:
				result = Boolean(variable instanceof DiscordJS.GuildMember);
				break;
			case 4:
				result = Boolean(variable instanceof DiscordJS.Message);
				break;
			case 5:
				result = Boolean(variable instanceof DiscordJS.TextChannel);
				break;
			case 6:
				result = Boolean(variable instanceof DiscordJS.VoiceChannel);
				break;
			case 7:
				result = Boolean(variable instanceof DiscordJS.Role);
				break;
			case 8:
				result = Boolean(variable instanceof DiscordJS.Guild);
				break;
			case 9:
				result = Boolean(variable instanceof DiscordJS.Emoji);
				break;
		}
	}
	this.executeResults(result, data, cache);
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