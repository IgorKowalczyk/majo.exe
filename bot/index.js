module.exports = (client) => {
 require("../utilities/client/util")(client);
 require("../utilities/giveaways/giveaways")(client);
 ["command", "event"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
 });
};
