const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')

module.exports = class MoveBotCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'move',
      aliases: ['mv', 'movehere'],
      group: 'voice',
      memberName: 'move',
      description: `Moves the bot to the user's current voice channel, if any.`,
      details: `For use when you want to move the bot to your channel, and your channel has more people than the channel the bot is currently in.`,
      examples: ['move', 'mv', 'movehere'],
      guildOnly: true
    })
  }
  async run (msg) {
    let voiceChannel = msg.member.voiceChannel
    const queue = this.queue.get(msg.guild.id)
    const cmdPrefix = this.client.provider.get(msg.guild.id, 'prefix')
    if (!queue) {
      const response = await msg.reply(`Summon me with the \`${cmdPrefix}add\` command first!`)
      response.delete(2000)
      msg.delete(2000)
    } else if (queue.voiceChannel.members.size - 1 >= msg.member.voiceChannel.members.size && !msg.member.permissions.has('MANAGE_MESSAGES')) {
      return msg.channel.send({embed: {
        color: 15105570,
        fields: [{
          name: `Whoops...`,
          value: `Your channel has less people than the one I'm in... Ask an Admin to move me!`
        }]
      }})
    } else if (queue.voiceChannel.members.size - 1 < msg.member.voiceChannel.members.size || msg.member.permissions.has('MANAGE_MESSAGES')) {
      const botPerms = await voiceChannel.permissionsFor(this.client.user)
      const prefix = this.client.provider.get(msg.guild.id, 'prefix')
      if (!botPerms.has('CONNECT')) {
        return msg.channel.send({embed: {
          color: 15158332,
          fields: [{
            name: `Whoops...`,
            value: `I can't connect to your channel... Ask an Admin for help.`
          }]
        }})
      }
      if (!botPerms.has('SPEAK')) {
        return msg.channel.send({embed: {
          color: 15158332,
          fields: [{
            name: `Whoops...`,
            value: `I can't speak in your channel... Ask an Admin for help.`
          }]
        }})
      }
      queue.voiceChannel = voiceChannel
      queue.textChannel = msg.channel
      voiceChannel.join()
      return queue.textChannel.send({embed: {
        color: 15844367,
        title: `I seem to have been moved!`,
        description: stripIndents`${msg.author} has moved me to ${queue.voiceChannel.name}!
          Type \`${prefix}help mv\` for more information.`
      }})
    }
  }
  get queue () {
    if (!this._queue) this._queue = this.client.registry.resolveCommand('voice:add').queue
    return this._queue
  }
}
