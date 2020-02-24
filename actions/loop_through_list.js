module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Loop Through List",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Lists and Loops",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const list = ['Server Members', 'Server Channels', 'Server Roles', 'Server Emojis', 'All Bot Servers', 'Mentioned User Roles', 'Command Author Roles', 'Temp Variable', 'Server Variable', 'Global Variable'];
	return `Loop ${list[parseInt(data.list)]} through Event #${data.source}`;
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["source", "list", "varName", "tempVarName", "type"],

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
		Source List:<br>
		<select id="list" class="round" onchange="glob.onChange1(this)">
			${data.lists[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br><br>
<div style="width: 95%;">
	Temp Variable Name (stores <span id="tempName">member</span> throughout loops):<br>
	<input id="tempVarName" class="round" type="text">
</div><br>
<div style="width: 85%;">
	Event:<br>
	<select id="source" class="round">
	</select>
</div><br>
<div style="width: 85%;">
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

	glob.onChange1 = function(event) {
		this.listChange(event, 'varNameContainer');
		const id = parseInt(event.value);
		let result = '';
		switch(id) {
			case 0:
				result = 'member';
				break;
			case 1:
				result = 'channel';
				break;
			case 4:
				result = 'server';
				break;
			case 2:
			case 5:
			case 6:
				result = 'role';
				break;
			case 3:
				result = 'emoji';
				break;
			case 7:
			case 8:
			case 9:
				result = 'item';
				break;
		}
		document.getElementById('tempName').innerHTML = result;
	};

	glob.onChange1(document.getElementById('list'));

	const $evts = glob.$evts;
	const source = document.getElementById('source');
	source.innerHTML = '';
	for(let i = 0; i < $evts.length; i++) {
		if($evts[i]) {
			source.innerHTML += `<option value="${i}">${$evts[i].name}</option>\n`;
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
	
	const id = parseInt(data.source);
	if(!Files.data.events[id]) {
		this.callNextAction(cache);
		return;
	}
	const actions = Files.data.events[id].actions;

	const storage = parseInt(data.list);
	const varName = this.evalMessage(data.varName, cache);
	const list = this.getList(storage, varName, cache);

	const act = actions[0];
	if(act && this.exists(act.name)) {
		const looper = function(i) {
			if(!list[i]) {
				if(data.type === 'true') this.callNextAction(cache);
				return;
			}
			const cache2 = {
				actions: actions,
				index: 0,
				temp: cache.temp,
				server: cache.server,
				msg: (cache.msg || null)
			}
			cache2.temp[data.tempVarName] = list[i];
			cache2.callback = function() {
				looper(i + 1);
			}.bind(this);
			this[act.name](cache2);
		}.bind(this);
		looper(0);
		if(data.type === 'false') this.callNextAction(cache);
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