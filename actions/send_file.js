module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Send File",

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
	const channels = ['Same Channel', 'Command Author', 'Mentioned User', 'Mentioned Channel', 'Default Channel', 'Temp Variable', 'Server Variable', 'Global Variable'];
	return `${channels[parseInt(data.channel)]}: "${data.message.replace(/[\n\r]+/, '')}"`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["channel", "varName", "file", "message"],

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
<div style="float: left; width: 35%;">
	Send To:<br>
	<select id="channel" class="round" onchange="glob.sendTargetChange(this, 'varNameContainer')">
		${data.sendTargets[isEvent ? 1 : 0]}
	</select>
</div>
<div id="varNameContainer" style="display: none; float: right; width: 60%;">
	Variable Name:<br>
	<input id="varName" class="round" type="text" list="variableList"><br>
</div>
<br><br><br>
<div style="padding-top: 8px;">
	Local File URL:<br>
	<input id="file" class="round" type="text" value="resources/"><br>
</div>
<div>
	Message:<br>
	<textarea id="message" rows="8" placeholder="Insert message here..." style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
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

	glob.sendTargetChange(document.getElementById('channel'), 'varNameContainer');
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
	const msg = cache.msg;
	const channel = parseInt(data.channel);
	const message = data.message;
	if(channel === undefined || message === undefined) return;
	const varName = this.evalMessage(data.varName, cache);
	const target = this.getSendTarget(channel, varName, cache);
	if(target && target.send) {
		try {
			target.send(this.evalMessage(message, cache), {
				files: [
					this.getLocalFile(this.evalMessage(data.file, cache))
				]
			}).then(function() {
				this.callNextAction(cache);
			}.bind(this)).catch(this.displayError.bind(this, data, cache));
		} catch(e) {
			this.displayError(data, cache, e);
		}
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