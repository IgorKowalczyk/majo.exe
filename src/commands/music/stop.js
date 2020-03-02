export default class Stop {
  static name = 'stop';
  static aliases = ['leave', 'quit'];
  static description =
    'The bot will stop playing music and leaves the voice channel';

  static run(bot, message) {
    message.guild.voiceConnection
      ? message.guild.voiceConnection.disconnect()
      : message.channel.send(
          "I can't leave a voice channel if I'm not in one..."
        );
  }
}
