const { ArgumentType } = require('discord.js-commando')

module.exports = class MembeRoleArgumentType extends ArgumentType {
  constructor (client) {
    super(client, 'memberole')
    this.isMemb = false
    this.isRole = false
  }
  validate (value, msg) {
    let userType = this.client.registry.types.get('member')
    let roleType = this.client.registry.types.get('role')
    if (userType.validate(value, msg) && userType.parse(value, msg)) {
      this.isMemb = true
      return true
    } else if (roleType.validate(value, msg)) {
      this.isRole = true
      return true
    } else {
      return false
    }
  }
  parse (value, msg) {
    let userType = this.client.registry.types.get('member')
    let roleType = this.client.registry.types.get('role')
    if (this.isMemb) {
      this.isMemb = false
      return userType.parse(value, msg)
    } else if (this.isRole) {
      this.isRole = false
      return roleType.parse(value, msg)
    }
  }
}
