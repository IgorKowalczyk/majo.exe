module.exports = {

//---------------------------------------------------------------------
// Command Only
//
// If this is 'true', then this will only be available for commands.
//---------------------------------------------------------------------

commandOnly: true,

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Check Parameters",

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

fields: ["condition", "comparison", "value", "iftrue", "iftrueVal", "iffalse", "iffalseVal"],

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
	<div style="float: left; width: 45%;">
		Condition:<br>
		<select id="condition" class="round">
			<option value="0" selected>Number of Parameters is...</option>
			<option value="1">Number of Member Mentions are...</option>
			<option value="2">Number of Channel Mentions are...</option>
			<option value="3">Number of Role Mentions are...</option>
		</select>
	</div>
	<div style="padding-left: 5%; float: left; width: 25%;">
		Comparison:<br>
		<select id="comparison" class="round">
			<option value="0" selected>=</option>
			<option value="1">\<</option>
			<option value="2">\></option>
		</select>
	</div>
	<div style="padding-left: 5%; float: left; width: 25%;">
		Number:<br>
		<input id="value" class="round" type="text">
	</div>
</div><br><br><br>
<div style="padding-top: 8px;">
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
	const msg = cache.msg;
	let result = false;
	if(msg && msg.content.length > 0) {
		const condition = parseInt(data.condition);
		let value = 0;
		switch(condition) {
			case 0:
				value = msg.content.split(/\s+/).length - 1;
				break;
			case 1:
				value = msg.mentions.members.array().length;
				break;
			case 2:
				value = msg.mentions.channels.array().length;
				break;
			case 3:
				value = msg.mentions.roles.array().length;
				break;
		}
		const comparison = parseInt(data.comparison);
		const value2 = parseInt(data.value);
		switch(comparison) {
			case 0:
				result = Boolean(value == value2);
				break;
			case 1:
				result = Boolean(value < value2);
				break;
			case 2:
				result = Boolean(value > value2);
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