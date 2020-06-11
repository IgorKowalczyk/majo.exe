const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
  const user = args.join(" ");
  
  if (!user || user.length < 0) {
    let errorembeduser = new Discord.RichEmbed()
      .setTitle("Error :cry:")
      .addField("Usage", `${prefix}` + " github <username>")
      .setTimestamp()
    return message.channel.send(errorembeduser);
  }
  const data = await fetch(`https://api.github.com/users/${user}`).then((res) =>
    res.json()
  )
  .catch(error => {
    let errorembed = new Discord.RichEmbed()
    .setTitle("Error :cry:")
    .setDescription("Could not fetch data. Please try again or make sure the name is correctly spelled!")
	.setColor("FF5757")
    .setTimestamp()
  return message.channel.send(errorembed);
  })
  
    if (data.message === "Not Found") {
	let errorembed = new Discord.RichEmbed()
    .setTitle("Error :cry:")
	.setColor("FF5757")
    .setDescription("Could not fetch data. Please try again or make sure the name is correctly spelled!")
    .setTimestamp()
  return message.channel.send(errorembed);
  }

  
  const repos = `https://github.com/${data.login}/repositories`;
  const embed = new Discord.RichEmbed()
    .setTitle(`${data.login === null ? "Not specified." : data.login}`)
    .setURL(`https://github.com/${data.login}`)
    .setThumbnail(data.avatar_url)
    .addField("Name", `${data.name === null ? "Not specified." : data.name}`, true)
    .addField("Bio", `${data.bio === null ? "Not specified." : data.bio}`)
    .addField(`Repositories (${data.public_repos})`, `[\`${repos}\`](${repos})`)
    .setFooter("Powered by Github API")
    .addField("Followers", data.followers, true)
    .addField("Following", data.following, true)
    .setTimestamp()
    .setColor("RANDOM");

  message.channel.send(embed);
};

module.exports.help = {
    name: "github",
    description: "Display Github User stats",
    usage: "github <user>",
    type: "Utility"  
}