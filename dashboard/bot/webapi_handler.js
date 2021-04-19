const discord = require("discord.js")
const client = new discord.Client()
const {token, prefix} = require("../../config")
client.on("ready",()=>{
  console.log("im ready")
})
function userhit(userResponse){
  //Este ID de canal é do servidor im in, por favor, substitua com o ID do canal do seu servidor
  client.channels.cache.get('710425657003212810').send(`Usuário autorizdo com ${userResponse.username}#${userResponse.discriminator}`)
}
function checkguild(member_id,guilds){
  owner_guilds = []
  bot_guilds = []
  invitebot_guilds = []
  guilds.forEach((item, i) => {
    if(item.owner == true){
      owner_guilds.push({"name":item.name,"id":item.id})
      if(bot.guilds.cache.get(item.id)){
        bot_guilds.push({"name":item.name,"id":item.id})
      }
      if(!bot.guilds.cache.get(item.id)){
        invitebot_guilds.push({"name":item.name,"id":item.id})
      }
    }
  });
  return {bot_guilds,invitebot_guilds}
}

function manageguild(g_id){
  let guild = client.guilds.cache.get(g_id)
  if(guild){
    let memberCount = guild.memberCount
    let guildname = guild.name
    let iconurl = guild.iconURL()
    let owner = guild.owner.displayName
    let id = guild.id
    return {memberCount,guildname,iconurl,owner,id}
  }
  return "Você não compartilha o mesmo servidor com o bot"
}

//parse the channels from POST request
async function modifyguild(channels, g_id, webuser){
    let c = channels[0].split(',')
    editguild = client.guilds.cache.get(g_id)
    if(!editguild.channels.cache.find(c=>c.name == 'dashboard-logs')) return "Error"
    else{
      let logs = await editguild.channels.cache.find(c => c.name == 'dashboard-logs')
      logs.send(`Usuário iniciou a edição do servidor ${webuser.tag}`)
      c.forEach((item, i) => {
      editguild.channels.create(item,"text").then(()=>{
        console.log("Canal criado",item)
      }).catch((e)=>{
        editguild.channels.cache.find(c => c.name == 'dashboard-logs').send(`[-] Error: ${e}`)
      })
      });
    }
    return "OK"
}


//setup function for dashboard logging
client.on("message",async message=>{
  if(message.author == message.author.client) return;
  if(message.content.startsWith(prefix+"setup")){
    await message.channel.send("[OK] Iniciando a configuração")
    if(message.member.hasPermission('ADMINISTRATOR')){
      await message.guild.channels.create("dashboard-logs","text").then(()=>{
        message.channel.send("[+] Canal criado!")
      }).catch((e)=>{
        message.channel.send(`[-] Erro: ${e}`)
      })
    }else return message.channel.send("[-] Você não tem permissão correta para executar este comando")
  }
})

client.on("guildCreate",async()=>{
  await message.systemChannel.send('Obrigado por me convidar aqui\n Use ``..setup`` Para iniciar a configuração!')
})

bot.login(token)
module.exports =  {userhit,manageguild,checkguild,modifyguild};