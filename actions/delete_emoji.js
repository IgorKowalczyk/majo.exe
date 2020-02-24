module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Delete Emoji",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Emoji Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const inputTypes = ['Specific Emoji', 'Temp Variable', 'Server Variable', 'Global Variable'];
	return `${inputTypes[parseInt(data.emoji)]} (${data.varName})`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["emoji", "varName"],

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
		Source Image:<br>
		<select id="emoji" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Specific Emoji</option>
			<option value="1">Temp Variable</option>
			<option value="2">Server Variable</option>
			<option value="3">Global Variable</option>
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
		<span id="extName">Emoji Name</span>:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
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

	glob.onChange1 = function(event) {
		const value = parseInt(event.value);
		const varNameInput = document.getElementById("extName");
		if(value === 0) {
			varNameInput.innerHTML = "Emoji Name";
		} else {
			varNameInput.innerHTML = "Variable Name";
		}
	};

	glob.onChange1(document.getElementById('emoji'));
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
	const type = parseInt(data.emoji);
	const varName = this.evalMessage(data.varName, cache);
	let emoji;
	if(type === 0) {
		emoji = server.emojis.find('name', varName);
	} else {
		emoji = this.getVariable(type, varName, cache);
	}
	if(!emoji) {
		this.callNextAction(cache);
		return;
	}
	if(server && server.deleteEmoji) {
		server.deleteEmoji(emoji).then(function() {
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