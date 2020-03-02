export default class Skip {
  static name = 'skip';
  static aliases = ['next'];
  static description = 'Skips to the next song';

  static run(bot, message, args, options) {
    let guildData = options.active.get(message.guild.id);

    if (!guildData) {
      return message.channel.send('The queue seems to be empty!');
    }

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) {
      return message.channel.send(
        "Sorry but I'm needed in a different channel already!"
      );
    }

    let userAmount = message.member.voiceChannel.members.size;
    let skipAmount = Math.floor(userAmount / 2);
    let skips = guildData.queue[0].voteSkips;

    if (!skips) skips = [];
    if (skips.includes(message.member.id)) {
      return message.channel.send(
        `Sorry but you've voted already! ${skips.length}`
      );
    }

    skips.push(message.member.id);
    options.active.set(message.guild.id, guildData);

    if (skips.length >= skipAmount) {
      message.channel.send('Getting the next song ready!');
      return guildData.dispatcher.emit('end');
    }

    message.channel.send(`Added to skip list. ${skips.length}/${skipAmount}`);
  }
}
