const { APIMessage, Structures } = require("discord.js");

class Message extends Structures.get("Message") {
 async lineReply(content, mention, options) {
  const mentionRepliedUser = typeof ((options || content || {}).allowedMentions || {}).repliedUser === "undefined" ? true : (options || content).allowedMentions.repliedUser;
  delete ((options || content || {}).allowedMentions || {}).repliedUser;
  const apiMessage = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this.channel, content, options).resolveData();
  Object.assign(apiMessage.data, {
   message_reference: {
    message_id: this.id,
   },
  });
  if (!apiMessage.data.allowed_mentions || Object.keys(apiMessage.data.allowed_mentions).length === 0)
   apiMessage.data.allowed_mentions = {
    parse: ["users", "roles", "everyone"],
   };
  if (mention == true) {
   if (typeof apiMessage.data.allowed_mentions.replied_user === "undefined")
    Object.assign(apiMessage.data.allowed_mentions, {
     replied_user: mentionRepliedUser,
    });
  }
  if (Array.isArray(apiMessage.data.content)) {
   return Promise.all(
    apiMessage
     .split()
     .map((x) => {
      x.data.allowed_mentions = apiMessage.data.allowed_mentions;
      return x;
     })
     .map(this.lineReply.bind(this))
   );
  }
  const { data, files } = await apiMessage.resolveFiles();
  return this.client.api.channels[this.channel.id].messages
   .post({
    data,
    files,
   })
   .then((d) => this.client.actions.MessageCreate.handle(d).message);
 }
}

Structures.extend("Message", () => Message);
