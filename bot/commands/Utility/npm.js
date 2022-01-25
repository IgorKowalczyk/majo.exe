const fetch = require("node-fetch");
const { MessageEmbed } = require(`discord.js`);

module.exports = {
 name: "npm",
 aliases: ["npmjs", "npmio"],
 description: "Display NPM package info",
 category: "Utility",
 usage: "npm <package>",
 run: async (client, message, args) => {
  try {
   const pkg = args[0];
   if (!pkg) {
    return client.createError(message, `${client.bot_emojis.error} | You have to provide npm package name!\n\n**Usage:** \`${client.prefix} npm <package>\``);
   }
   const body = await fetch(`https://registry.npmjs.com/${pkg}`).then((res) => {
    if (res.status === 404) throw ".";
    return res.json();
   });
   const version = body.versions[body["dist-tags"].latest];
   let deps = version.dependencies ? Object.keys(version.dependencies) : null;
   let maintainers = body.maintainers.map((user) => user.name);
   if (maintainers.length > 10) {
    const len = maintainers.length - 10;
    maintainers = maintainers.slice(0, 10);
    maintainers.push(`...${len} more.`);
   }
   if (deps && deps.length > 10) {
    const len = deps.length - 10;
    deps = deps.slice(0, 10);
    deps.push(`...${len} more.`);
   }
   const embed = new MessageEmbed()
    .setTitle(`NPM - ${pkg}`)
    .setColor("#4f545c")
    .setURL(`https://npmjs.com/package/${pkg}`)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setThumbnail("https://media.discordapp.net/attachments/721019707607482409/904777543423492157/58a19602036db1daee0d7863c94673a4.png").setDescription(`${">>> " + body.description || "> No Description"}\n
				**Version:** ${body["dist-tags"].latest}
				**License:** ${body.license}
				**Author:** ${body.author ? body.author.name : "Unknown"}
				**Modified:** ${new Date(body.time.modified).toDateString()}
				**Dependencies:** ${deps && deps.length ? deps.join(", ") : "None"}`);
   message.reply({ embeds: [embed] });
  } catch (err) {
   if (err == ".") return client.createError(message, `${client.bot_emojis.error} | No packages found! Please try searching again!\n\n**Usage:** \`${client.prefix} npm <package>\``);
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
