const Discord = module.require("discord.js");
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
                title: "That command does not exist, Take a look at " + `${prefix}` + " help!"
            }})
  }
              
        let newembed = new Discord.RichEmbed()
          .setAuthor(":grey_question: Help - " + `${file.help.type}` + "Command", message.guild.iconURL)
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
  var Utility= [];
  
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
      if (type == "Utility") Utility.push([namelist, desclist, usage]);
      if (type == "NSFW") NSFW.push([namelist, desclist, usage]);

      if (namelist == "userinfo") {
        done = true
      }      
    });
    
    if (done) {
      if (!command) {
        var embed = new Discord.RichEmbed()
          .setAuthor("Help", message.guild.iconURL)
          .setColor("RANDOM")
          .setImage(client.AvatarURL)
          .setFooter(`Bot created by ${cnf.owner} • ${commandnum} Commands`,)               
          .addField(":bricks: General", General.map((roles => roles[0])).join(", ") ,)
          .addField(":hammer: Moderation", Moderation.map((roles => roles[0])).join(", ") ,)
          .addField(":rofl: Fun", Fun.map((roles => roles[0])).join(", ") ,)
		  .addField(":notes: Music", "Soon!" ,)
		  .addField(":moneybag: Leveling system", "Soon!" ,)
          .addField(":toolbox: Utility", Utility.map((roles => roles[0])).join(", ") ,)
          .addField(":smirk: NSFW", NSFW.map((roles => roles[0])).join(", ") ,)
          .addField(":grey_question: Command Information", `${prefix}` + " help <command>")
        
        message.channel.send(embed)
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