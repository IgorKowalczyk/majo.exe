export default class Coin {
  static name = 'coin';
  static aliases = ['headsortails', 'munt'];
  static description = 'Rolls a coin to determine the outcome of the game';

  static run(bot, message) {
    let coinflip =
      Math.floor(Math.random() * 2) == 0
        ? 'The coin landed on tails'
        : 'The coin landed on heads';
    message.channel.send(coinflip);
  }
}
