const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const Timeout = new Map();

module.exports = async (client, interaction) => {
 if (interaction.isCommand()) {
  if (interaction.guild) {
   if (!interaction.guild.me.permissions.has("EMBED_LINKS")) return;
   if (!interaction.guild.me.permissions.has("SEND_MESSAGES")) return;
  }
  await interaction.deferReply({ ephemeral: false }).catch((err) => {
   console.log(err);
  });
  const cmd = client.slash_commands.get(interaction.commandName);
  if (!cmd) return interaction.followUp({ ephemeral: true, content: "It appears this command does not exist? If you believe this is a mistake please contact support!" });
  const timeout = cmd.timeout || client.config.ratelimit;
  const key = `${interaction.user.id}/${cmd.name}/${interaction.guild.id}`;
  const found = Timeout.get(key);
  if (found) {
   const timeLeft = timeout - (Date.now() - found);
   const embed = new MessageEmbed() // Prettier
    .setColor("RED")
    .setAuthor({ name: `Ratelimit`, iconURL: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) })
    .setDescription(`> ${interaction.member} slow down! You have to wait \`${ms(timeLeft)}\` before you can use this command again!`)
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
   return interaction.followUp({ embeds: [embed] });
  } else {
   const args = [];
   for (let option of interaction.options.data) {
    if (option.type === "SUB_COMMAND") {
     if (option.name) args.push(option.name);
     option.options?.forEach((x) => {
      if (x.value) args.push(x.value);
     });
    } else if (option.value) args.push(option.value);
   }
   if (!cmd.allow_dm) cmd.allow_dm = false;
   if (!interaction.guild && cmd.allow_dm == false) {
    const only_dm = new MessageEmbed().setColor("RED").setDescription("❌ | This command can only be used on servers!");
    return interaction.followUp({ ephemeral: true, embeds: [only_dm] });
   }
   cmd.run(client, interaction, args);
   Timeout.set(key, Date.now());
   setTimeout(() => {
    Timeout.delete(key);
   }, timeout);
  }
 }
};
