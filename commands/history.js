const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
let defaultTrackCount = 30;
    argArr = args.split(' ');
    let includeUsers = argArr.some(val => val != null && val.toLowerCase().indexOf('user') >= 0);
    let includeTimes = argArr.some(val => val != null && val.toLowerCase().indexOf('time') >= 0);
    let historyTxt = getPlayedTracksText(message, tryParseInt(args, defaultTrackCount), includeUsers, includeTimes);
    let historyMsgs = splitTextByLines(historyTxt);
    for (let i = 0; i < historyMsgs.length; i++){
      message.reply(historyMsgs[i]);
    }
  }
 
module.exports.help = {
    name: "history",
    description: "Display the play history.",
    usage: "history",
    type: "Music"   
}