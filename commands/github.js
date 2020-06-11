const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  const user = args.join(" ");
  
  if (!user || user.length < 0) {
    let errorembeduser = new Discord.RichEmbed()
      .setTitle("**ERROR**")
      .addField("Usage", "`r@github <username>`")
      .setTimestamp()
    message.channel.send(errorembeduser);
  }
  const data = await fetch(`https://api.github.com/users/${user}`).then((res) =>
    res.json()
  )
  .catch(error => {
    let errorembed = new Discord.RichEmbed()
    .setTitle("**ERROR**")
    .setDescription("Could not fetch data. Please try again or make sure the name is correctly spelled!")
    .setTimestamp();
  message.channel.send(errorembed);
  })

  
  const repos = `https://github.com/${data.login}/repositories`;
  const blog = data.blog === null ? "Not specified." : data.blog
  const embed = new Discord.RichEmbed()
    .setTitle(`${data.login === null ? "Not specified." : data.login}`)
    .setURL(`https://github.com/${data.login}`)
    .setThumbnail(data.avatar_url)
    .addField("Name", `${data.name === null ? "Not specified." : data.name}`, true)
    .addField("Bio", `${data.bio === null ? "Not specified." : data.bio}`)
    .addField(`Repositories (${data.public_repos})`, `[\`${repos}\`](${repos})`)
    .setFooter("Powered by Github API V3.")
    .addField(
      "Website",
      `[\`${blog}\`](${blog})`
    )
    .addField("Followers", data.followers, true)
    .addField("Following", data.following, true)
    .setTimestamp()
    .setColor("RANDOM");

  message.channel.send(embed);
};

module.exports.help = {
    name: "github",
    description: "Display Github user or repo stats",
    usage: "github <user/repo>",
    type: "Utility"  
}