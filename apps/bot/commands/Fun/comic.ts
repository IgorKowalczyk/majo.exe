import { load } from "cheerio";
import { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, ButtonStyle, ChatInputCommandInteraction } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "comic",
 description: "📚 Get a comic from xkcd, phd or garfield",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/comic <comic>",
 options: [
  {
   name: "xkcd",
   description: "💬 Check out the latest xkcd comic",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     type: ApplicationCommandOptionType.Integer,
     name: "issue",
     description: "Issue number to see the comic.",
     min_value: 1,
    },
   ],
  },
  {
   name: "phd",
   description: "💬 Check out the latest phd comic",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     type: ApplicationCommandOptionType.Integer,
     name: "issue",
     description: "Issue number to see the comic.",
     min_value: 1,
    },
   ],
  },
  {
   name: "garfield",
   description: "💬 Check out the latest garfield comic",
   type: ApplicationCommandOptionType.Subcommand,
  },
 ],
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   const command = interaction.options.getSubcommand();

   if (command === "xkcd") {
    const issue = interaction.options.getInteger("issue");
    const data = await fetch(`https://xkcd.com${issue ? `/${issue}` : ""}/info.0.json`);
    const json = await data.json();

    if (!json) {
     return client.errorMessages.createSlashError(interaction, "❌ No results found.");
    }

    const embed = new EmbedBuilder()
     .setTitle(`📚 xkcd ${json.num} - ${json.title}`)
     .setDescription(json.alt)
     .setImage(json.img)
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({ size: 256 }),
     });

    const actionRow = new ActionRowBuilder<ButtonBuilder>() // prettier
     .addComponents([
      new ButtonBuilder() // prettier
       .setStyle(ButtonStyle.Link)
       .setLabel("View on xkcd")
       .setURL(`https://xkcd.com/${json.num}`),
     ]);

    return interaction.followUp({ embeds: [embed], components: [actionRow] });
   }

   if (command === "phd") {
    const issue = interaction.options.getInteger("issue");
    const data = await fetch(`https://phdcomics.com${issue ? "/comics/archive.php?comicid=" + issue : ""}`);
    const text = await data.text();

    if (!text) {
     return client.errorMessages.createSlashError(interaction, "❌ No results found.");
    }

    const $ = load(text);

    const images: string[] = [];

    $("img[name='comic2']").each((_, element) => {
     const imageUrl = $(element).attr("src");
     if (imageUrl) images.push(imageUrl);
    });

    if (!images[0]) {
     return client.errorMessages.createSlashError(interaction, "❌ No results found.");
    }

    const embed = new EmbedBuilder()
     .setTitle(`📚 PHD Comics ${issue ? `#${issue}` : ""}`)
     .setImage(images[0])
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({ size: 256 }),
     });

    const actionRow = new ActionRowBuilder<ButtonBuilder>() // prettier
     .addComponents([
      new ButtonBuilder() // prettier
       .setStyle(ButtonStyle.Link)
       .setLabel("View on PHD Comics")
       .setURL(`https://phdcomics.com${issue ? "/comics/archive.php?comicid=" + issue : ""}`),
     ]);

    return interaction.followUp({ embeds: [embed], components: [actionRow] });
   }

   if (command === "garfield") {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const request = await fetch(`https://www.gocomics.com/garfield/${year}/${month}/${day}`);
    const text = await request.text();

    if (!text) {
     return client.errorMessages.createSlashError(interaction, "❌ No results found.");
    }

    const $ = load(text);
    const image = $(".item-comic-image img").attr("src");

    if (!image) {
     return client.errorMessages.createSlashError(interaction, "❌ No results found.");
    }

    const embed = new EmbedBuilder()
     .setTitle(`📚 Garfield by Jim Davis (${year}/${month}/${day})`)
     .setImage(image)
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({ size: 256 }),
     });

    const actionRow = new ActionRowBuilder<ButtonBuilder>() //
     .addComponents([
      new ButtonBuilder() // prettier
       .setStyle(ButtonStyle.Link)
       .setLabel("View on GoComics")
       .setURL(`https://www.gocomics.com/garfield/${year}/${month}/${day}`),
     ]);

    return interaction.followUp({ embeds: [embed], components: [actionRow] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
