const {MessageEmbed} = require('discord.js')
const ms = require('ms');

/*module.exports.run = async(client,message,args)=>{
  var members = [];
  
  message.guild.members.forEach((member) => {
    if (!member.user.bot)
      members.push(member);  
  });
  
  let winner = members[Math.floor(Math.random() * members.length)];

        if(!args[0]) return message.channel.send(`You did not specify your time!`)
        if(!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")) return message.channel.send(`You did not use the correct formatting for the time!`)
        if(isNaN(args[0][0])) return message.channel.send(`That is not a number!`)
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(`I could not find that channel in the guild!`)
        let prize = args.slice(2).join(" ")
        if(!prize) return message.channel.send(`No prize specified!`)
        message.channel.send(`*Giveaway created in ${channel}*`)
        let Embed = new MessageEmbed()
        .setTitle(`New giveaway!`)
        .setDescription(`The user ${message.author} is hosting a giveaway for the prize of **${prize}**`)
        .setTimestamp(Date.now()+ms(args[0]))
        .setColor(`BLUE`)
        let m = await channel.send(Embed)
        m.react("🎉")
        setTimeout(() => {
            if(m.reactions.cache.size<=1) return message.channel.send(`Not enough people reacted for me to start draw a winner!`)
            channel.send(`The winner of the giveaway for **${prize}** is... ${winner}`)
        }, ms(args[0]));
    }

module.exports.help = {
    name: "test",
    description: "Start a giveawy",
    usage: "test <user>",
    type: "Fun" 
}*/

const Discord = module.require("discord.js");

module.exports.run = async(client,message,args)=>{
        let Emojis="";
        let EmojisAnimated="";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id){
            return bot.emojis.cache.get(id).toString()
        } 
        message.guild.emojis.cache.forEach(emoji=>{
            OverallEmojis++;
            if(emoji.animated){
                Animated++;
                EmojisAnimated+=Emoji(emoji.id)
            }else{
                EmojiCount++;
                Emojis+=Emoji(emoji.id)
            }
        })
        let Embed = new MessageEmbed()
        .setTitle(`Emojis in ${message.guild.name}.`)
        .setDescription(`**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`)
        .setColor(`RANDOM`)
        message.channel.send(Embed)
    }

module.exports.help = {
    name: "test",
    description: "Start a giveawy",
    usage: "test <user>",
    type: "Fun" 
}