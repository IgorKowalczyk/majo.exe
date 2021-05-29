const { Structures } = require("discord.js");

class Message extends Structures.get("Message") {
 async buttons(content, options) {
  if (!options.buttons) {
   options.buttons = [];
  }

  if (!Array.isArray(options.buttons)) {
   throw new Error("The buttons must be an array");
  }

  let buttons = [];
  let styles = ["blupurple", "grey", "green", "red", "url"];

  options.buttons.forEach((x, i) => {
   if (!x.style) x.style = "blupurple";

   if (!styles.includes(x.style)) {
    throw new Error(`#${i} button has invalid style, recived ${x.style}`);
   }

   if (!x.label) {
    throw new Error(`#${i} button don't has a label`);
   }

   if (typeof x.label !== "string") x.label = String(x.label);

   if (x.style === "url") {
    if (!x.url) {
     throw new Error(`If the button style is "url", you must provide url`);
    }
   } else {
    if (!x.id) {
     throw new Error(
      `If the button style is not "url", you must provide custom id`
     );
    }
   }

   let style;

   if (x.style === "blupurple") {
    style = 1;
   } else if (x.style === "grey") {
    style = 2;
   } else if (x.style === "green") {
    style = 3;
   } else if (x.style === "red") {
    style = 4;
   } else if (x.style === "url") {
    style = 5;
   }

   let data = {
    type: 2,
    style: style,
    label: x.label,
    custom_id: x.id || null,
    url: x.url || null,
   };

   buttons.push(data);
  });

  options.buttons === null;

  this.client.ws.on("INTERACTION_CREATE", async (data) => {
   let typeStyles = {
    1: "blupurple",
    2: "grey",
    3: "green",
    4: "red",
    5: "url",
   };

   await this.client.channels.cache.get(data.channel_id).messages.fetch();

   let message = await this.client.channels.cache
    .get(data.channel_id)
    .messages.cache.get(data.message.id);

   let clicker = await this.client.guilds.cache
    .get(data.guild_id)
    .members.cache.get(data.member.user.id);

   this.client.emit("clickButton", {
    version: data.version,
    type: data.type,
    style: typeStyles[data.type],
    token: data.token,
    id: data.data.custom_id,
    discordId: data.id,
    applicationId: data.application_id,
    clicker: clicker,
    message,
   });
  });

  this.client.api.channels[this.channel.id].messages.post({
   headers: {
    "Content-Type": "applications/json",
   },
   data: {
    content: content,
    components: [
     {
      type: 1,
      components: buttons,
     },
    ],
    options,
    embed: options.embed || null,
   },
  });
 }
}

Structures.extend("Message", () => Message);
