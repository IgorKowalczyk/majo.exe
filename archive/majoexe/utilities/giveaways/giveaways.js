const { GiveawaysManager } = require("discord-giveaways");
const emojis = require("../../config/emojis_config");

module.exports = function (client) {
 const Giveaways = class extends GiveawaysManager {
  async getAllGiveaways() {
   return new Promise((resolve, reject) => {
    client.database.query("SELECT `data` FROM `giveaways`", (err, res) => {
     if (err) {
      console.error(err);
      return reject(err);
     }
     const giveaways = res.map((row) => JSON.parse(row.data, (_, v) => (typeof v === "string" && /BigInt\("(-?\d+)"\)/.test(v) ? eval(v) : v)));
     resolve(giveaways);
    });
   });
  }

  async saveGiveaway(messageId, giveawayData) {
   return new Promise((resolve, reject) => {
    client.database.query("INSERT INTO `giveaways` (`message_id`, `data`) VALUES (?,?)", [messageId, JSON.stringify(giveawayData, (_, v) => (typeof v === "bigint" ? `BigInt("${v}")` : v))], (err, res) => {
     if (err) {
      console.error(err);
      return reject(err);
     }
     resolve(true);
    });
   });
  }

  async editGiveaway(messageId, giveawayData) {
   return new Promise((resolve, reject) => {
    client.database.query("UPDATE `giveaways` SET `data` = ? WHERE `message_id` = ?", [JSON.stringify(giveawayData, (_, v) => (typeof v === "bigint" ? `BigInt("${v}")` : v)), messageId], (err, res) => {
     if (err) {
      console.error(err);
      return reject(err);
     }
     resolve(true);
    });
   });
  }

  async deleteGiveaway(messageId) {
   return new Promise((resolve, reject) => {
    client.database.query("DELETE FROM `giveaways` WHERE `message_id` = ?", messageId, (err, res) => {
     if (err) {
      console.error(err);
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
   // exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
   reaction: emojis.giveaway,
  },
 });
 client.giveawaysManager = manager;
};
