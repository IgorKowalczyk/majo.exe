const { Command } = require('discord.js-commando')

module.exports = class MoveAllCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'moveall',
      group: 'moderation',
      memberName: 'moveall',
      aliases: ['mvall', 'mva'],
      examples: ['moveall <departChannel> <destChannel> ', 'mvall <departChannel> <destChannel>', 'mva <departChannel> <destChannel>'],
      description: 'Moves all users in one channel into another.',
      details: 'If there are channels that are similar in name and the input is ambiguous about which to use, then the channel that comes first alphanumerically will be used.',
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 5
      },
      args: [
        {
          key: 'departChannel',
          prompt: 'Enter the name of the voice channel of whose members you want to move.',
          type: 'string'
        },
        {
          key: 'destChannel',
          prompt: 'Enter the name of the destination channel.',
          type: 'string'
        }
      ]
    })
  }

  async hasPermission (msg) {
    var userLevel = await this.client.userProvider.getLevel(msg.author.id)
    return userLevel >= 2 || this.client.isOwner(msg.author)
  }

  run (msg, args) {
    const departChannel = msg.guild.channels.find(channel => channel.name.toLowerCase().includes(args.departChannel.toLowerCase()))
    const destChannel = msg.guild.channels.find(channel => channel.name.toLowerCase().includes(args.destChannel.toLowerCase()))
    const queue = this.queue.get(msg.guild.id)
    if (!departChannel && !destChannel) {
      return msg.reply(`both departure and destination channels are nonexistant. Choose an existing one.`)
    }
    if (!departChannel) {
      return msg.reply(`invalid departure channel. Choose an existing voice channel.`)
    }
    if (!destChannel) {
      return msg.reply(`invalid destination channel. Choose an existing voicechannel.`)
    }
    let memberArray = departChannel.members.array()
    for (var memberPos = 0; memberPos < memberArray.length; memberPos++) {
      if (memberArray[memberPos].id === this.client.user.id) queue.voiceChannel = destChannel
      memberArray[memberPos].setVoiceChannel(destChannel)
    }
  }
  get queue () {
    if (!this._queue) this._queue = this.client.registry.resolveCommand('voice:add').queue
    return this._queue
  }
}
