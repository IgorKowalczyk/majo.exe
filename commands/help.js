const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
  var command = args[0];
  var commandnum = 0;
  
  if (command) {
        try {
          var file = require(`./${command}`);
         } catch (err) {
    message.channel.send({embed: {
                color: 3447003,
                title: "That command does not exist, Take a look at !majo help!"
            }})
  }
              
        let newembed = new Discord.RichEmbed()
          .setAuthor(`Help - ${file.help.type} Command`, message.guild.iconURL)
          .setColor("3498db")
          .setImage(client.AvatarURL)
          .setFooter(`Bot created by Igor Kowalczyk • ${commandnum} Commands`, "https://cdn.discordapp.com/avatars/544164729354977282/c39c2d7b39e5d6d5d13a8c2bdb010373.png?size=2048")
          .addField(file.help.usage, file.help.description)
        
        message.channel.send(newembed);  
  }

  var done = false
  
  var General = [];
  var Moderation = [];
  var Fun = [];
  var Utility= [];
  
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
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
	  if (type == "Music") Music.push([namelist, desclist, usage]);

      if (namelist == "userinfo") {
        done = true
      }      
    });
    
    if (done) {
      if (!command) {
        var embed = new Discord.RichEmbed()
          .setAuthor("Help", message.guild.iconURL)
          .setColor("3498db")
          .setImage(client.AvatarURL)
          .setFooter(`Bot created by Igor Kowalczyk • ${commandnum} Commands`, "https://cdn.discordapp.com/avatars/544164729354977282/c39c2d7b39e5d6d5d13a8c2bdb010373.png?size=2048")               
          .addField("General", General.map((roles => roles[0])).join(", ") , true)
          .addField("Moderation", Moderation.map((roles => roles[0])).join(", ") , true)
          .addField("Fun", Fun.map((roles => roles[0])).join(", ") , true)
          .addField("Utility", Utility.map((roles => roles[0])).join(", ") , true)
		  .addField("Music", Music.map((roles => roles[0])).join(", ") , true)
          .addField("Command Information", "!majo help <command>")
        
        message.channel.send(embed)
      }
    }
  });
}

module.exports.help = {
    name: "help",
    description: "Displays all the commands available",
    usage: "help",
    type: "General" 
}