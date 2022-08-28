module.exports = (client) => {
 require("../utilities/client/util")(client);
 require("../utilities/giveaways/giveaways")(client);
 require(`./handlers/event`)(client);
};
