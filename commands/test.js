const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

console.log(`${message.member} ran the "GiveAway" command`);

var item = "";
var time;
var winnerCount
let messageArray = message.content.split(" ");
//-- giveaway 1(winnerCount) 60(seconds) Item Giveaway

for (var i = 3; i < messageArray.length; i++){
  item += (messageArray[i] + " ");
}
winnerCount = Number(messageArray[1]);
time = Number(messageArray[2]);


var giveEmbed = new Discord.RichEmbed();
giveEmbed.setDescription(item);
var embedSent = await message.channel.send(giveEmbed);
embedSent.react("🎉");
setTimeout(function() {
  var peopleReacted = embedSent.reactions.get("🎉").users;
  var winners = [];

  // Checks if fewer people reacted than the winnerCount allows users to win
  if (peopleReacted.length >= winnerCount) {
    winners = peopleReacted;
  } else {
    // Gets as many random users from the peopleReacted as winnerCount allows users to win
    for (var i = 0; i < winnerCount; i++){
      var index = Math.floor(Math.random() * peopleReacted.length);
      winners.push(peopleReacted[index]);
      // After adding a user to winners, remove that item from the array to prevent him from winning multiple times
      peopleReacted.splice(index, 1);
    }
  }

  var winnerMsg = "User(s) ";
  for (var i = 0; i < winners.length; i++){
    // Add each winner to the winnerMsg
    winnerMsg += (winners[i].toString() + ", ");
  }

  var haveHas;
  if (winners.length === 1){
    haveHas = "has";
  }
  else {
    haveHas = "have";
  }
  message.channel.send(`${winnerMsg} ${haveHas} won ${item}`);
}
}

module.exports.help = {
    name: "test",
    description: "Create a giveaway",
    usage: "giveaway <winnerCount> <seconds> <item>",
    type: "Fun" 
}

