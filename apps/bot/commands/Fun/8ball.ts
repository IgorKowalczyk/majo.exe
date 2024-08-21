import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, type ChatInputCommandInteraction } from "discord.js";
import type { GuildSettings } from "../../util/types/Command";
import type { Majobot } from "../..";

export default {
 name: "8ball",
 description: "🎱 Ask the 8ball a question",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/8ball <question>",
 options: [
  {
   name: "question",
   description: "Question to ask 8ball",
   required: true,
   type: ApplicationCommandOptionType.String,
   max_length: 100,
  },
 ],
 run: (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   const args = interaction.options.getString("question");

   const images = [
    ["Yes.", "https://c.tenor.com/TFhmPga4xEwAAAAC/magic8ball-yes.gif"],
    ["It is certain", "https://c.tenor.com/eyI116E3kWYAAAAC/yoda-8ball.gif"],
    ["Without a doubt", "https://c.tenor.com/-0tatbxLQVQAAAAC/yoda-8ball.gif"],
    ["Yes definelty", "https://c.tenor.com/fc7fywg2oQQAAAAC/yoda-8ball.gif"],
    ["You may rely on it", "https://c.tenor.com/8J1uZFp8xMUAAAAC/yoda-8ball.gif"],
    ["As I see it, yes", "https://c.tenor.com/EIAYng3CUf0AAAAC/yoda-8ball.gif"],
    ["Most likely", "https://c.tenor.com/EIAYng3CUf0AAAAC/yoda-8ball.gif"],
    ["Outlook not so good", "https://c.tenor.com/Ji3GcuKvu1cAAAAC/magic8ball-simpsons.gif"],
    ["Signs point to yes", "https://c.tenor.com/mrN4WoxyRE8AAAAC/shaking8ball-stranger-things4.gif"],
    ["followUp hazy, try again", "https://c.tenor.com/BokmYoZhr1AAAAAC/yoda-8ball.gif"],
    ["Ask again later", "https://c.tenor.com/Voqiq18wUFIAAAAC/yoda-8ball.gif"],
    ["Better not tell you now...", "https://c.tenor.com/Voqiq18wUFIAAAAC/yoda-8ball.gif"],
    ["Cannot predict now", "https://c.tenor.com/fs_hXVg58LkAAAAC/yoda-8ball.gif"],
    ["Concentrate and ask again", "https://c.tenor.com/Voqiq18wUFIAAAAC/yoda-8ball.gif"],
    ["Don't count on it", "https://c.tenor.com/cw2aa9cnQ6QAAAAC/magic-eight.gif"],
    ["My followUp is no", "https://c.tenor.com/rJ1ioW_FkhUAAAAC/yoda-8ball.gif"],
   ];

   const parsed = images.map((x) => [x[0], x[1]]);
   const random = Math.floor(Math.random() * parsed.length);

   const embed = new EmbedBuilder()
    .setDescription(`>>> **Q:** ${args} \n**A:** ${parsed[random][0]}`)
    .setImage(parsed[random][1])
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });

   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
