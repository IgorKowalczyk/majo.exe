const { server } = require("../../config");

module.exports = {
    name: "lockdown",
    aliases: ["raid", "antiraid", "anti-raid"],
    description: "tranca o servidor",
    category: "Moderação",
    usage: "lock",
run: async (client, message, args) => {
//  const roleA = await message.guild.roles.cache.find(r => r.id === "ID do Cargo Que libera o server");
    const roleA = await message.guild.roles.cache.find(r => r.id === message.guild.id); //se você não tiver um cargo que libera o servidor use este, se não use o de cima
    if (
      !message.member.roles.cache.some(r =>
        [
          "731630867428016300",
          "784931656401420299",
          "746098865731534900"
        ].includes(r.id) )) {
      return message.channel.send({embed: {
        color: 16734039,
        description:
        `${message.author.username} esse comando é restrito.`
       }});
    } else if (message.content.includes("on")) {
    /*Defina as permissões aqui https://discordapi.com/permissions.html
    Recomendado: Create invite, Change Nickname, Read Messages, View Channel e Read Message history
    Se quiser já pronto use este |, Se quiser sem poder mudar o apelido use o de baixo (padrão)
                                 V
      await roleA.setPermissions(67175425).catch(console.error);*/
      await roleA.setPermissions(66561).catch(console.error);
      await message.channel.send({embed: {
        color: 16734039,
        description:
        `O sistema de Antiraid foi ligado por ${message.author.username}`
       }});
    } else if (message.content.includes("off")) {
/*Defina as permissões aqui https://discordapi.com/permissions.html
    Se quiser já pronto use este | (padrão) se quiser mudar algo troque o 0 do de cima pela combinação e adicione // no de baixo
                                 V
      await roleA.setPermissions(67175425).catch(console.error);*/
      await roleA.setPermissions(2251673153).catch(console.error);
      await message.channel.send(
        {embed: {
            color: 16734039,
            description:
            `O sistema de Antiraid foi desligado por ${message.author.username}`
           }}
        );
    } else {
      return message.channel.send({embed: {
        color: 16734039,
        description:
        `${message.author.username} a sintaxe correta é antiraid on | off`
       }});
    }
  }
};