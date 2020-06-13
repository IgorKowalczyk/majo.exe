const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

function dice() {
    var answers = ["1", "2", "3", "4", "5", "6"]
    return answers[Math.floor(Math.random()*answers.length)];
}
  
   var embed = new Discord.RichEmbed()
    .setDescription(":game_die: The dice rolled " + `${dice()}` + "! :game_die:")
    .setColor("RANDOM")
  
  message.channel.send(embed=embed);

}

module.exports.help = {
    name: "dice",
    description: "Roll a dice",
    usage: "dice",
    type: "Fun" 
}