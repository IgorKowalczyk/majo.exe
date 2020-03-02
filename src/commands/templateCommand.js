export default class Template {
  static name = '';
  static aliases = [];
  static description = 'This is the template command';

  static run(bot, message, args, options) {
    message.channel.send('Cannot send an empty string!');
  }
}
