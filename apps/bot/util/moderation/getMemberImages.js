import { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } from "discord.js";

/**
 * @param {client} client
 * @param {CommandInteraction} interaction
 * @param {string} color
 * @returns {Promise<void>}
 * @description Get user avatar
 * */
export async function getUserAvatar(client, interaction, color) {
 try {
  const user = interaction.options.getMember("user");
  const serverAvatar = interaction.options.getBoolean("guild_avatar") || false;

  if (!user) {
   return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to check avatar");
  }

  let avatar;
  if (serverAvatar) {
   const response = await fetch(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
    headers: {
     Authorization: `Bot ${client.token}`,
    },
   });
   const data = await response.json();
   if (data.avatar) {
    const ext = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    avatar = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${user.id}/avatars/${data.avatar}${ext}`;
   } else {
    avatar = user.user.displayAvatarURL({
     size: 4096,
    });
   }
  } else {
   avatar = user.user.displayAvatarURL({
    extension: "gif",
    size: 4096,
   });
  }

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle(`${user.user.globalName || user.user.username} ${serverAvatar ? "server" : ""} avatar`)
   .setImage(avatar)
   .setFooter({
    text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
    iconURL: interaction.member.user.displayAvatarURL({
     size: 256,
    }),
   });

  const row = new ActionRowBuilder().addComponents(
   new ButtonBuilder() // prettier
    .setLabel("Avatar")
    .setStyle(ButtonStyle.Link)
    .setURL(avatar)
  );

  return interaction.followUp({ ephemeral: true, embeds: [embed], components: [row] });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}

/**
 * @param {client} client
 * @param {CommandInteraction} interaction
 * @param {string} color
 * @returns {Promise<void>}
 * @description Get user banner
 * */
export async function getUserBanner(client, interaction, color) {
 try {
  const user = interaction.options.getMember("user");
  const serverBanner = interaction.options.getBoolean("guild_banner") || false;

  if (!user) {
   return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to check banner");
  }

  let banner;
  if (serverBanner) {
   const response = await fetch(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
    headers: {
     Authorization: `Bot ${client.token}`,
    },
   });
   const data = await response.json();
   if (data.banner) {
    const ext = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    banner = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${ext}`;
   } else {
    banner = null;
   }
  } else {
   const response = await fetch(`https://discord.com/api/users/${user.id}`, {
    headers: {
     Authorization: `Bot ${client.token}`,
    },
   });
   const data = await response.json();
   if (data.banner) {
    const ext = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    banner = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${ext}`;
   } else {
    banner = null;
   }
  }

  if (!banner) {
   return client.errorMessages.createSlashError(interaction, "❌ This user doesn't have a banner");
  }

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle(`${user.user.globalName || user.user.username} ${serverBanner ? "server" : ""} banner`)
   .setImage(banner)
   .setFooter({
    text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
    iconURL: interaction.member.user.displayAvatarURL({
     size: 256,
    }),
   });

  const row = new ActionRowBuilder().addComponents(
   new ButtonBuilder() // prettier
    .setLabel("Banner")
    .setStyle(ButtonStyle.Link)
    .setURL(banner)
  );

  return interaction.followUp({ ephemeral: true, embeds: [embed], components: [row] });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
