const { MessageSelectMenu, MessageActionRow } = require("discord.js");
const emojis = require("../config/emojis_config");
const descriptions_config = require("../config/categories_config");
function capitalize(string) {
 if(string == "Nsfw") {
  return string.toUpperCase();
 } else {
  return string.charAt(0).toUpperCase() + string.slice(1);
 }
}

const create_mh = (array) => {
 if (!array) throw new Error("The options were not provided! Make sure you provide all the options!");
 if (array.length < 0) throw new Error(`The array has to have atleast one thing to select!`);
 let select_menu;
 let id = "help-menus";
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
  let sName = `${capitalize(name)}`;
  let tName = name.charAt(0).toUpperCase() + name.slice(1);
  let fName = name.toUpperCase();
  return menus.push({
   label: sName,
   description: `${descriptions[name.toLowerCase()] || "No description! 👻"}`,
   value: fName,
   emoji: `${emo[name.toLowerCase()] || "❔"}`,
  });
 });
 let selectionmenu = new MessageSelectMenu() // Prettier
  .setCustomId(id)
  .setPlaceholder(`${emojis.sparkles} | Choose the command category!`)
  .addOptions(menus);

 select_menu = new MessageActionRow() // Prettier
  .addComponents(selectionmenu);
 return {
  smenu: [select_menu],
  sid: id,
 };
};

module.exports = create_mh;
