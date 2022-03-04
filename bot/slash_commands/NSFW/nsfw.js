module.exports = {
 name: "nsfw",
 description: "🍑 Something he he",
 usage: "/nsfw <command>",
 category: "Fun",
 nsfw: true,
 options: [
  {
   name: "command",
   description: "🍑 NSFW Command",
   required: true,
   type: 3,
   choices: [
    {
     name: "anal",
     value: "anal",
     description: "🔞 Anal image or gif",
    },
    {
     name: "ass",
     value: "ass",
     description: "🔞 Ass image or gif",
    },
    {
     name: "belle",
     value: "belle",
     description: "🔞 Belle delphine image or video",
    },
    {
     name: "blowjob",
     value: "blowjob",
     description: "🔞 Belle delphine image or gif",
    },
    {
     name: "boobs",
     value: "boobs",
     description: "🔞 Tits image or gif",
    },
    {
     name: "classic",
     value: "classic",
     description: "🔞 Classic porn image or gif",
    },
    {
     name: "cum",
     value: "cum",
     description: "🔞 Cum image or gif",
    },
    {
     name: "eroneko",
     value: "eroneko",
     description: "🔞 Eroneko image or gif",
    },
    {
     name: "feet",
     value: "feet",
     description: "🔞 Feet image or gif",
    },
    {
     name: "foxgirl",
     value: "foxgirl",
     description: "🔞 Foxgirl image or gif",
    },
    {
     name: "fuck",
     value: "fuck",
     description: "🔞 Fuck image or gif",
    },
    {
     name: "hentai",
     value: "hentai",
     description: "🔞 Hentai image or gif",
    },
    {
     name: "lesbian",
     value: "lesbian",
     description: "🔞 Lesbian image or gif",
    },
    {
     name: "lewd",
     value: "lewd",
     description: "🔞 Lewd image or gif",
    },
    {
     name: "lick",
     value: "lick",
     description: "🔞 Lick image or gif",
    },
    {
     name: "neko",
     value: "neko",
     description: "🔞 Neko image or gif",
    },
    {
     name: "pussy",
     value: "pussy",
     description: "🔞 Pussy image or gif",
    },
    {
     name: "spank",
     value: "spank",
     description: "🔞 Spank image or gif",
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  const embed = new MessageEmbed().setTitle("Soon!").setColor("GREEN").setDescription("> WIP").setImage("https://media4.giphy.com/media/MHVc6pPqfiUnK/giphy.gif").setTimestamp();
  interaction.followUp({ embeds: [embed] });
 },
};
