module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Call Command/Event",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Other Stuff",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	return `${data.source.substring(0, 3) === 'com' ? 'Command' : 'Event'} ${data.source.substring(4)}`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["source", "type"],

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
<div style="width: 85%;">
	Command/Event:<br>
	<select id="source" class="round">
		<optgroup id="commands" label="Commands"></optgroup>
		<optgroup id="events" label="Events"></optgroup>
	</select><br>
	Call Type:<br>
	<select id="type" class="round">
		<option value="true" selected>Synchronous</option>
		<option value="false">Asynchronous</option>
	</select>
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

	const $cmds = glob.$cmds;
	const coms = document.getElementById('commands');
	for(let i = 0; i < $cmds.length; i++) {
		if($cmds[i]) {
			coms.innerHTML += `<option value="com-${i}">${$cmds[i].name}</option>\n`;
		}
	}

	const $evts = glob.$evts;
	const evet = document.getElementById('events');
	for(let i = 0; i < $evts.length; i++) {
		if($evts[i]) {
			evet.innerHTML += `<option value="evt-${i}">${$evts[i].name}</option>\n`;
		}
	}
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
	const Files = this.getDBM().Files;
	
	const id = parseInt(data.source.substring(4));
	let actions;
	if(data.source.substring(0, 3) === 'com' && !!Files.data.commands[id]) {
		actions = Files.data.commands[id].actions;
	} else if(data.source.substring(0, 3) === 'evt' && !!Files.data.events[id]) {
		actions = Files.data.events[id].actions;
	} else {
		this.callNextAction(cache);
		return;
	}

	const act = actions[0];
	if(act && this.exists(act.name)) {
		const cache2 = {
			actions: actions,
			index: 0,
			temp: cache.temp,
			server: cache.server,
			msg: (cache.msg || null)
		}
		if(data.type === 'true') {
			cache2.callback = function() {
				this.callNextAction(cache);
			}.bind(this);
			this[act.name](cache2);
		} else {
			this[act.name](cache2);
			this.callNextAction(cache);
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