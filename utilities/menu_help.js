const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require("../config/emojis_config");
const descriptions_config = require("../config/categories_config");
const config = require("../config/main_config");
function capitalize(string) {
 if (string == "Nsfw") {
  return string.toUpperCase();
 } else {
  return string.charAt(0).toUpperCase() + string.slice(1);
 }
}

const create_mh = (array) => {
 if (!array) throw new Error("The options were not provided! Make sure you provide all the options!");
 if (array.length < 0) throw new Error(`The array has to have atleast one thing to select!`);
 let menus = [];
 const emo = {
  general: emojis.bricks,
  moderation: emojis.hammer,
  fun: emojis.rofl,
  music: emojis.music,
  economy: emojis.money,
  utility: emojis.tools,
  image: emojis.picture_frame,
  owner: emojis.owner_crown,
  nsfw: emojis.smirk, // https://www.youtube.com/watch?v=YMm2gv7TStc&t=37s ...
  giveaway: emojis.giveaway,
  setup: emojis.screw_that,
  social: emojis.rocket,
 };
 const descriptions = {
  general: descriptions_config.general,
  moderation: descriptions_config.moderation,
  fun: descriptions_config.fun,
  music: descriptions_config.music,
  economy: descriptions_config.economy,
  utility: descriptions_config.utility,
  image: descriptions_config.image,
  owner: descriptions_config.owner,
  nsfw: descriptions_config.nsfw,
  giveaway: descriptions_config.giveaway,
  setup: descriptions_config.setup,
  social: descriptions_config.social,
 };
 array.forEach((cca) => {
  let name = cca;
  let category_name = `${capitalize(name)}`;
  let function_name = name.toUpperCase();
  return menus.push({
   label: category_name,
   description: `${descriptions[name.toLowerCase()] || "No description! 👻"}`,
   value: function_name,
   emoji: `${emo[name.toLowerCase()] || "❔"}`,
  });
 });
 const selectionmenu = new MessageSelectMenu() // Prettier
  .setCustomId("help-menus")
  .setPlaceholder(`${emojis.sparkles} | Choose the command category!`)
  .addOptions(menus);
 const components = new MessageActionRow() // Prettier
  .addComponents(selectionmenu);
 const buttons_components = new MessageActionRow() // Prettier
  .addComponents(
   new MessageButton() // Prettier
    .setURL(`https://discord.com/oauth2/authorize/?permissions=${config.permissions}&scope=${config.scopes}&client_id=${config.id}`)
    .setStyle("LINK")
    .setLabel("Invite me")
  );
 if (process.env.DASHBOARD) {
  buttons_components.addComponents(
   // Prettier
   new MessageButton() // Prettier
    .setURL(`${process.env.DOMAIN}/commands`)
    .setStyle("LINK")
    .setLabel("View all commands"),
   new MessageButton() // Prettier
    .setLabel("Dashboard")
    .setURL(`${process.env.DOMAIN}`)
    .setStyle("LINK")
  );
 }
 return {
  smenu: [buttons_components, components],
  sid: "help-menus",
 };
};

module.exports = create_mh;
