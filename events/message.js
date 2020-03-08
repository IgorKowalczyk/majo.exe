const kick = require("../commands/kick");

module.exports = (client, message) => {
  if (message.content.startsWith("!majo kick")) {
    return kick(message);
  }
};
