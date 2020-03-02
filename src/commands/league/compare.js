import Base from '../../modules/base';
import getPlayerStats from '../../modules/getplayerstats';

function getPlayerOrFillerSeason({seasons}, targetSeason) {
  return Object.assign(
    {
      season: targetSeason,
      tier: 'unranked',
      rank: null,
      leaguePoints: 0,
    },
    seasons.find(({season}) => season === targetSeason) || {}
  );
}

export default class Compare extends Base {
  static name = 'compare';
  static aliases = [];
  static description = 'Compares the ranked stats of 2 players';
  static tierMap = [
    'unranked',
    'iron',
    'bronze',
    'silver',
    'gold',
    'platinum',
    'diamond',
    'master',
    'grandmaster',
    'challenger',
  ];

  static run(bot, message, args) {
    const firstUser = args[0];
    const secondUser = args[1];

    if (firstUser && secondUser) {
      Promise.all([getPlayerStats(firstUser), getPlayerStats(secondUser)]).then(
        ([player1, player2]) => {
          const notFound = [
            !player1.username && firstUser,
            !player2.username && secondUser,
          ]
            .filter(x => x)
            .map(x => `"${x}"`);

          if (notFound.length > 0) {
            message.channel.send(
              `Could not find stats for ${notFound.join(' and ')}`
            );
          } else {
            // player 1 en player 2 bestaan woohoo
            const combinedSeasons = [...player1.seasons, ...player2.seasons];
            const highestSeasonNumber =
              (combinedSeasons
                .map(({season}) => season)
                .sort((a, b) => b - a)
                .filter(x => x)[0] || 0) + 1;

            const table = Array(highestSeasonNumber)
              .fill(0)
              .map((_, idx) => idx)
              .slice(1)
              .reverse()
              .filter(
                cs =>
                  (player1.seasons.find(({season: s}) => s == cs) || {}).rank ||
                  (player2.seasons.find(({season: s}) => s == cs) || {}).rank
              )
              .map(season => {
                const p1 = getPlayerOrFillerSeason(player1, season);
                const p2 = getPlayerOrFillerSeason(player2, season);
                const p1s = `${p1.tier.slice(0, 3)} - ${p1.rank || '??'}`;
                const p2s = `${p2.tier.slice(0, 3)} - ${p2.rank || '??'}`;
                const lowestRank = season < 9 ? 5 : 4;
                const p1r =
                  this.tierMap.findIndex(t => t === p1.tier) * 100 +
                  (lowestRank - (p1.rank || lowestRank)) * 10 +
                  p1.leaguePoints;

                const p2r =
                  this.tierMap.findIndex(t => t === p2.tier) * 100 +
                  (lowestRank - (p2.rank || lowestRank)) * 10 +
                  p2.leaguePoints;

                const bestIndicator = p1r > p2r ? '>' : p1r === p2r ? '~' : '<';

                // tierMap.findIndex(t => t === 'iron') // 1 * 100 => 100
                // (rank || 0) * 10
                // + LP

                return [
                  season ? `S${season}` : '=>',
                  p1s,
                  ` ${bestIndicator} `,
                  p2s,
                ];
              });

            const indicators = table.map(row => row[2]);
            const p1r = indicators.filter(i => i === ' > ').length;
            const p2r = indicators.filter(i => i === ' < ').length;

            const bestIndicator = p1r > p2r ? '>' : p1r === p2r ? '~' : '<';

            table.unshift([
              '',
              player1.username,
              bestIndicator.repeat(3),
              player2.username,
            ]);

            message.channel.send('\u200b\n' + this.makeTable(table) + '\n');
          }
        }
      );
    } else {
      message.channel.send('I need 2 users if I want to compare them');
    }
  }
}

// player1.seasons.max => 9
// player2.seasons.max => 4
// 9
//

// Iron 4 = 0
// Iron 3 = 100
// Iron 2 = 200
// Iron 1 = 300
// Silver 4 = 300
// Silver 3 = 400
// Silver 2 = 500
// Silver 1 = 600
// Gold 4 = 600
// Gold 3 = 700
// Gold 2 =  800
// Gold I = 900
// Plat 4 = 900
// Plat 3 = 1000
// Plat 2 = 1100
// Plat 1 = 1200
// Dia 4 = 1200
// Dia 3 = 1300
// Dia 2 = 1400
// Dia 1 = 1500
// Master = 1600
// Grandmaster = 1700
// Challenger = 1800
