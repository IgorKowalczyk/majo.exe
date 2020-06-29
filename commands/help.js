const Discord = require("discord.js");
const fs = require("fs");
const cnf = require('../config.json');

module.exports.run = async (client, message, args) => {
  var command = args[0];
  var commandnum = 0;
  const prefix = process.env.PREFIX;

  if (command) {
        try {
          var file = require(`./${command}`);
         } catch (err) {
    message.channel.send({embed: {
                color: 16734039,
                description: "That command does not exist, Take a look at " + `${prefix}` + " help!"
            }})
  }
              
        let newembed = new Discord.RichEmbed()
          .setTitle(":grey_question: Help - " + `${file.help.type}` + " Command", message.guild.iconURL)
          .setColor("RANDOM")
          .setImage(client.AvatarURL)
          .setFooter(`Bot created by ${cnf.owner}`,)
          .addField(`${prefix} ` + file.help.usage, file.help.description)
        
        message.channel.send(newembed);  
  }

  var done = false
  
  var General = [];
  var Moderation = [];
  var Fun = [];
  var Music = [];
  var Utility = [];
  var Economy = [];
  var NSFW = [];
  var Owner = [];
  
  fs.readdir("./commands/", (err, files) => {
	if (err) return;
    commandnum = files.length;
    
    files.forEach(file => {
      let f = require(`./${file}`);
      var namelist = f.help.name;
      var desclist = f.help.description;
      var usage = f.help.usage;
      var type = f.help.type;
      
      if (type == "General") General.push([namelist, desclist, usage]);
      if (type == "Moderation") Moderation.push([namelist, desclist, usage]);
      if (type == "Fun") Fun.push([namelist, desclist, usage]);
      if (type == "Music") Music.push([namelist, desclist, usage]);
      if (type == "Utility") Utility.push([namelist, desclist, usage]);
	  if (type == "Economy") Economy.push([namelist, desclist, usage]);
      if (type == "NSFW") NSFW.push([namelist, desclist, usage]);
      if (type == "Owner") Owner.push([namelist, desclist, usage]);
      if (namelist == "userinfo") {
        done = true
      }      
    });
    
    if (done) {
      if (!command) {
		message.channel.send({embed: {
            color: 3447003,
            description: "Generating the help..."
        }}).then(msg=>{
        var embed = new Discord.RichEmbed()
          .setAuthor("Help", message.guild.iconURL)
          .setColor("RANDOM")
          .setImage(client.AvatarURL)          
          .addField(":bricks: General", General.map((roles => roles[0])).join(", ") || `No commands` ,)
          .addField(":hammer: Moderation", Moderation.map((roles => roles[0])).join(", ") || `No commands` ,)
          .addField(":rofl: Fun", Fun.map((roles => roles[0])).join(", ") || `No commands` ,)
		  .addField(":notes: Music", Music.map((roles => roles[0])).join(", ") || `Soon!` ,)
		  .addField(":moneybag: Economy system", Economy.map((roles => roles[0])).join(", ") || `No commands` ,)
          .addField(":toolbox: Utility", Utility.map((roles => roles[0])).join(", ") || `No commands` ,)
          .addField(":smirk: NSFW", NSFW.map((roles => roles[0])).join(", ") || `No commands` ,)
          .addField(":grey_question: Command Information", `${prefix}` + " help <command>")
	      .setFooter(`Commands for Owner: ` + Owner.map((roles => roles[0])).join(", ") + `\nBot created by ${cnf.owner} • ${commandnum} Commands`,)     
        msg.edit(embed);
        msg.edit("\u200B")
		})
      } else if (err) return;
    }
  });
}

module.exports.help = {
    name: "help",
    description: "Displays all the commands available",
    usage: "help",
    type: "General" 
}