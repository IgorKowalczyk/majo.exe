import Base from '../../modules/base';

export default class Region extends Base {
  static name = 'region';
  static aliases = ['changeregion'];
  static description =
    'Changes the server region between EU-west and EU-central';

  static run(bot, message) {
    if (!this.adminCheck(message)) return;

    let currentRegion = message.guild.region;
    let otherRegion =
      message.guild.region === 'eu-central' ? 'eu-west' : 'eu-central';

    if (message.guild.region === currentRegion)
      message.guild.setRegion(otherRegion);

    message.channel.send(
      `${message.author.username} changed the region from ${currentRegion} to \`${otherRegion}\` !`
    );
  }
}
