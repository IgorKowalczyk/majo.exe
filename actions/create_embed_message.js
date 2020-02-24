module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Create Embed Message",

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
	return `${data.title}`;
},

//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	return ([data.varName, 'Embed Message']);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["title", "author", "color", "timestamp", "url", "authorIcon", "imageUrl", "thumbUrl", "storage", "varName"],

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
<div style="float: left; width: 50%;">
	Title:<br>
	<input id="title" class="round" type="text"><br>
	Author:<br>
	<input id="author" class="round" type="text" placeholder="Leave blank to disallow author!"><br>
	Color:<br>
	<input id="color" class="round" type="text" placeholder="Leave blank for default!"><br>
	Use Timestamp:<br>
	<select id="timestamp" class="round" style="width: 90%;">
		<option value="true">Yes</option>
		<option value="false" selected>No</option>
	</select><br>
</div>
<div style="float: right; width: 50%;">
	URL:<br>
	<input id="url" class="round" type="text" placeholder="Leave blank for none!"><br>
	Author Icon URL:<br>
	<input id="authorIcon" class="round" type="text" placeholder="Leave blank for none!"><br>
	Image URL:<br>
	<input id="imageUrl" class="round" type="text" placeholder="Leave blank for none!"><br>
	Thumbnail URL:<br>
	<input id="thumbUrl" class="round" type="text" placeholder="Leave blank for none!"><br>
</div>
<div>
	<div style="float: left; width: 35%;">
		Store In:<br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text"><br>
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
	const embed = this.createEmbed();
	embed.setTitle(this.evalMessage(data.title, cache));
	if(data.url) {
		embed.setURL(this.evalMessage(data.url, cache));
	}
	if(data.author && data.authorIcon) {
		embed.setAuthor(this.evalMessage(data.author, cache), this.evalMessage(data.authorIcon, cache));
	}
	if(data.color) {
		embed.setColor(this.evalMessage(data.color, cache));
	}
	if(data.imageUrl) {
		embed.setImage(this.evalMessage(data.imageUrl, cache));
	}
	if(data.thumbUrl) {
		embed.setThumbnail(this.evalMessage(data.thumbUrl, cache));
	}
	if(data.timestamp === "true") {
		embed.setTimestamp(new Date());
	}
	const storage = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	this.storeValue(embed, storage, varName, cache);
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
	const DiscordJS = DBM.DiscordJS;
	const Actions = DBM.Actions;

	Actions.createEmbed = function() {
		return new DiscordJS.RichEmbed();
	};
}

}; // End of module