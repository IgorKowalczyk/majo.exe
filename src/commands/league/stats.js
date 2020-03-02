import Base from '../../modules/base';
import getPlayerStats from '../../modules/getplayerstats';

export default class Stats extends Base {
  static name = 'stats';
  static aliases = ['getstats', 'roastme'];
  static description = 'Fetches requested user ranked stats';

  static run(bot, message, args) {
    const input = args.join('+');
    getPlayerStats(input).then(user => {
      const table = user.seasons.map(({season, tier, rank, leaguePoints}) => [
        season === null ? 'Current' : `Season ${season}`,
        `${tier} ${rank || ''}`.trim(),
        `${leaguePoints}LP`,
      ]);

      message.channel.send(
        '\u200b\n' + this.makeTable(table, user.username) + '\n'
      );
    });
  }
}
