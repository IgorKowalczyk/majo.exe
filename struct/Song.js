const Util = require('discord.js')
const {oneLine} = require('common-tags')

module.exports = class Song {
  constructor (video, member) {
    this.id = video.id
    this.title = Util.escapeMarkdown(video.title)
    this.member = member
    this.length = video.durationSeconds ? video.durationSeconds : video.duration / 1000
    this.dispatcher = null
    this.playing = false
  }
  get url () {
    return `https://www.youtube.com/watch?v=${this.id}`
  }
  get thumbnail () {
    const thumbnail = `https://img.youtube.com/vi/${this.id}/mqdefault.jpg`
    return thumbnail
  }
  get username () {
    const name = `${this.member.user}`
    return name
  }
  get songLength () {
    return this.constructor.timeString(this.length)
  }
  timeLeft (currentTime) {
    return this.constructor.timeString(Math.ceil(this.length - currentTime))
  }
  static timeString (length, forceHours = false) {
    const hours = (Math.floor(length / 3600))
    const minutes = (Math.floor(length / 60))
    const seconds = (length % 60)

    return oneLine`
    ${forceHours || hours >= 1 ? hours + 'hour(s)' : ''}
    ${hours >= 1 ? Math.floor(minutes % 60) + 'mins' : minutes + 'mins'}
    ${seconds}secs`
  }
}
