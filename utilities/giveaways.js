const { GiveawaysManager } = require("discord-giveaways");
const sql = require("./database");
const emojis = require("../config/emojis_config");

module.exports = function (client) {
 const Giveaways = class extends GiveawaysManager {
  async getAllGiveaways() {
   return new Promise((resolve, reject) => {
    sql.query("SELECT `data` FROM `giveaways`", (err, res) => {
     if (err) {
      return reject(err);
     }
     const giveaways = res.map((row) => JSON.parse(row.data));
     resolve(giveaways);
    });
   });
  }
  async saveGiveaway(messageID, giveawayData) {
   return new Promise((resolve, reject) => {
    sql.query("INSERT INTO `giveaways` (`message_id`, `data`) VALUES (?,?)", [messageID, JSON.stringify(giveawayData)], (err, res) => {
     if (err) {
      return reject(err);
     }
     resolve(true);
    });
   });
  }
  async editGiveaway(messageID, giveawayData) {
   return new Promise((resolve, reject) => {
    sql.query("UPDATE `giveaways` SET `data` = ? WHERE `message_id` = ?", [JSON.stringify(giveawayData), messageID], (err, res) => {
     if (err) {
      return reject(err);
     }
     resolve(true);
    });
   });
  }
  async deleteGiveaway(messageID) {
   return new Promise((resolve, reject) => {
    sql.query("DELETE FROM `giveaways` WHERE `message_id` = ?", messageID, (err, res) => {
     if (err) {
      return reject(err);
     }
     resolve(true);
    });
   });
  }
 };

 const manager = new Giveaways(client, {
  updateCountdownEvery: 10000,
  hasGuildMembersIntent: true,
  embedColorEnd: "15859772",
  embedColor: "#ab4b52",
  default: {
   botsCanWin: false,
   exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
   reaction: emojis.giveaway,
  },
 });
 client.giveawaysManager = manager;
};
