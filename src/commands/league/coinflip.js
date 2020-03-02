export default class Coinflip {
  static name = 'coinflip';
  static aliases = ['rng'];
  static description = 'Rolls a coin to determine the outcome of the game';
  static outcomes = [
    'Your toplaner ends up taking the first tower at 10 minutes, `you win`',
    'Your adc has a 100CS lead at 15 mins, `you win`',
    'Your midlaner rotates while theirs is failing last hits on mid, `you win`',
    "Your support ends up 1v2'ing the enemy botlane, `you win`",
    'Your toplaner ends up taking the first tower at 10 minutes, `you win`',
    'Your jungler shits on the enemy in "their" jungle, `you win`',
    'Your toplaner has a gray screen for 75% of the game, `you lose`',
    'You midlaner "gets camped", `you lose`',
    'Your adc is too tilted to perform, `you lose`',
    'Your "support" never even bought a support item, `you lose`',
    'Your jungler fails the only smite that actually matters, `you lose`',
  ];

  static run(bot, message) {
    message.channel.send(
      this.outcomes[Math.floor(Math.random() * this.outcomes.length)]
    );
  }
}
