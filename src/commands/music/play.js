import YTDL from 'ytdl-core';

export default class Play {
  static name = 'play';
  static aliases = ['join', 'start'];
  static description =
    "Let's the bot join the voice channel the user is in, and will play the requested song.";

  static async run(bot, message, args, options) {
    let validate = await YTDL.validateURL(args[0]);
    let info = await YTDL.getInfo(args[0]);
    let data = options.active.get(message.guild.id) || {};

    if (!message.member.voiceChannel) {
      return message.channel.send(
        'You must be in a voice channel to summon me! :('
      );
    }

    if (message.guild.voiceChannel) {
      return message.channel.send("I'm already connected to a voice channel..");
    }

    if (!args[0]) return message.channel.send("I didn't get any URL to play!");

    if (!validate) {
      return message.channel.send(
        "I have an URL but I can't seem to find anything, check the provided URL!"
      );
    }

    if (!data.connection) {
      data.connection = await message.member.voiceChannel.join();
    }

    if (!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({
      songTitle: info.title,
      requestedBy: message.author.username,
      url: args[0],
      channel: message.channel.id,
    });

    !data.dispatcher
      ? playMusic(bot, options, data)
      : message.channel.send(
          `${message.author.username} added ${info.title} to the queue`
        );

    options.active.set(message.guild.id, data);
  }
}

const playMusic = async (bot, options, data) => {
  let settings = {seek: 2, volume: 1, bitrate: 12800};

  // Disabled because of recent ESLint 6.0.1 bug.
  /*eslint-disable */
  data.dispatcher = await data.connection.playStream(
    YTDL(data.queue[0].url, {filter: 'audioonly'}),
    settings
  );

  data.dispatcher.guildID = data.guildID;
  /*eslint-enable */

  data.dispatcher.once('end', function() {
    return stopMusic(bot, options, this);
  });

  bot.channels
    .get(data.queue[0].channel)
    .send(`Now playing: ${data.queue[0].songTitle}`);
};

const stopMusic = (bot, options, dispatcher) => {
  let fetchedData = options.active.get(dispatcher.guildID);

  fetchedData.queue.shift();

  if (fetchedData.queue.length > 0) {
    options.active.set(dispatcher.guildID, fetchedData);

    playMusic(bot, options, fetchedData);
  } else {
    options.active.delete(dispatcher.guildID);

    if (bot.guilds.get(dispatcher.guildID).me.voiceChannel) {
      bot.guilds.get(dispatcher.guildID).me.voiceChannel.leave();
    }
  }
};
