module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Check Member Permissions",

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

fields: ["member", "varName", "permission", "iftrue", "iftrueVal", "iffalse", "iffalseVal"],

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
<div style="padding-top: 8px; width: 80%;">
	Permission:<br>
	<select id="permission" class="round">
		<option value="ADMINISTRATOR">Administrator</option>
		<option value="CREATE_INSTANT_INVITE">Create Instant Invite</option>
		<option value="KICK_MEMBERS">Kick Members</option>
		<option value="BAN_MEMBERS">Ban Members</option>
		<option value="MANAGE_CHANNELS">Manage Channels</option>
		<option value="MANAGE_GUILD">Manage Guild</option>
		<option value="ADD_REACTIONS">Add Reactions</option>
		<option value="VIEW_AUDIT_LOG">View Audit Log</option>
		<option value="READ_MESSAGES">Read Messages</option>
		<option value="SEND_MESSAGES">Send Messages</option>
		<option value="SEND_TTS_MESSAGES">Send TTS Messages</option>
		<option value="MANAGE_MESSAGES">Manage Messages</option>
		<option value="EMBED_LINKS">Embed Links</option>
		<option value="ATTACH_FILES">Attach Files</option>
		<option value="READ_MESSAGE_HISTORY">Read Message History</option>
		<option value="MENTION_EVERYONE">Mention Everyone</option>
		<option value="EXTERNAL_EMOJIS">External Emojis</option>
		<option value="USE_EXTERNAL_EMOJIS">Use External Emojis</option>
		<option value="CONNECT">Connect</option>
		<option value="SPEAK">Speak</option>
		<option value="MUTE_MEMBERS">Mute Members</option>
		<option value="DEAFEN_MEMBERS">Deafen Members</option>
		<option value="MOVE_MEMBERS">Move Members</option>
		<option value="USE_VAD">Use Vad</option>
		<option value="CHANGE_NICKNAME">Change Nickname</option>
		<option value="MANAGE_NICKNAMES">Manage Nicknames</option>
		<option value="MANAGE_ROLES">Manage Roles</option>
		<option value="MANAGE_WEBHOOKS">Manage Webhooks</option>
		<option value="MANAGE_EMOJIS">Manage Emojis</option>
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

	glob.memberChange(document.getElementById('member'), 'varNameContainer')
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
	const type = parseInt(data.member);
	const varName = this.evalMessage(data.varName, cache);
	const member = this.getMember(type, varName, cache);
	let result = false;
	if(member) {
		result = member.permissions.has([data.permission]);
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