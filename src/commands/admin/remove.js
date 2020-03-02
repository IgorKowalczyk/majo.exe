import Base from '../../modules/base';

export default class Remove extends Base {
  static name = 'remove';
  static aliases = ['delete', 'purge', 'clear'];
  static description = 'Deletes 1-100 messages, \n Example: /remove 50';

  static run(bot, message, args) {
    if (!this.adminCheck(message)) return;
    message.delete();

    let messagesToDelete = Number(args[0]);

    if (!args[0]) {
      message.channel
        .send(
          `Sorry ${message.author.username}, you didn't tell me how many messages to delete!`
        )
        .then(message => {
          message.delete(5000);
        });
      return;
    }

    if (isNaN(messagesToDelete) || messagesToDelete > 100) {
      message.channel
        .send(
          `Sorry ${message.author.username}, but that's not a valid number! Please enter a number between 1-100`
        )
        .then(message => {
          message.delete(5000);
        });
      return;
    }

    messagesToDelete = Math.round(messagesToDelete);

    message.channel.bulkDelete(messagesToDelete).catch(console.error);
  }
}
