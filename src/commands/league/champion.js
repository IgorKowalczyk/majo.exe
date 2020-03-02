import {Champs} from '../../data/champions';
import {Users} from '../../data/prefferedchamps';

export default class Champion {
  static name = 'champion';
  static aliases = ['champ', 'champs', 'champions'];
  static description =
    'Returns a random champion, if given a lane it will return a champ for that lane\nFor example: /champion supp';

  static roleAliases = {
    bot: 'adc',
    support: 'supp',
    jgl: 'jungle',
  };

  static run(bot, message, args) {
    const suppliedRole = this.roleAliases[args[0]] || args[0];
    const username = (args[1] || '').toLowerCase();

    if (username && !Users[username]) {
      return message.channel.send(
        "I couldn't find a champion pool for this username..."
      );
    }

    const base = Users[username] || Champs;

    message.channel.send(
      base[suppliedRole][Math.floor(Math.random() * base[suppliedRole].length)]
    );
  }
}
