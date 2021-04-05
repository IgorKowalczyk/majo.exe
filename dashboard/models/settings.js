const { Schema, model } = require("mongoose");
module.exports = {
  name: "name"
}
const guildSettingSchema = new Schema({
  gid: { type: String },
  prefix: { type: String, default: "!majo" }
});

module.exports = model("guild_settings", guildSettingSchema);