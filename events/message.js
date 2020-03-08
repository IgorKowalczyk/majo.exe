const kick = require("../commands/kick");

module.exports = (client, message) => {
  if (message.content.startsWith("!kick")) {
    return kick(message);
  }
};
