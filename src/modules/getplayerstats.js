import fetch from 'node-fetch';
import {parse} from 'node-html-parser';

export default function getPlayerStats(searchQuery) {
  return fetch(`https://euw.op.gg/summoner/userName=${searchQuery}`)
    .then(res => res.text())
    .then(html => {
      const parsedHTML = parse(html);
      const usernameElement = parsedHTML.querySelector('.Profile .Name');
      const username = usernameElement && usernameElement.rawText;
      const user = {
        username,
        seasons: [],
      };

      (parsedHTML.querySelectorAll('.PastRankList li') || []).forEach(li => {
        // eslint-disable-next-line no-unused-vars
        const [_, tier, rank, leaguePoints] =
          /^(\w+)(?: (\d+)(?: (\d+))?)?/g.exec(
            li.attributes.title || li.rawText.trim().slice(3)
          ) || [];
        const seasonElement = li.querySelector('b');
        const finalTier = (tier || 'unranked').toLowerCase().trim();

        user.seasons.push({
          season: seasonElement
            ? parseInt(seasonElement.rawText.substr(1, 1))
            : -1,
          tier: finalTier,
          rank: finalTier === 'unranked' ? null : parseInt(rank || 4),
          leaguePoints: parseInt(leaguePoints || 0),
        });
      });

      const leaguePointsElement = parsedHTML.querySelector('.LeaguePoints');
      const tierAndRankElement = parsedHTML.querySelector('.TierRank');

      const leaguePoints =
        leaguePointsElement !== null
          ? leaguePointsElement.innerHTML.trim()
          : '0';

      const [currentTier, currentRank] =
        tierAndRankElement !== null
          ? tierAndRankElement.innerHTML.toLowerCase().split(' ')
          : ['unranked', ''];

      user.seasons.push({
        season: null,
        tier: currentTier.trim(),
        rank: parseInt(currentRank) || null,
        leaguePoints: parseInt(leaguePoints),
      });

      const latest = Math.max(...user.seasons.map(({season}) => season)) + 1;
      user.seasons.sort((a, b) => (b.season || latest) - (a.season || latest));

      return Object.freeze(user);
    });
}
