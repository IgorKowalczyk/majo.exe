const { MessageEmbed } = require("discord.js");

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
  if (!cmd) return interaction.followUp({ ephemeral: true, content: "An error has occured!" });
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
 }
};
