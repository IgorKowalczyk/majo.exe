const { richEmbed } = require('discord.js');
module.exports = {
    name: "modlogs",
    aliases: ["ml"],
    usage: "Use este comando para gerenciar logs mod.",
    commandCategory: "Moderação",
    cooldownTime: '5',
run: async (bot, message, args, funcs, con) => {
    try {
        con.query(`SELECT cn.caseNumber, gs.logsEnabled, gs.logsChannel FROM guildCasenumber as cn LEFT JOIN guildSettings as gs ON gs.guildId = cn.guildId WHERE cn.guildId ="${message.guild.id}"`, async (e, row) => {
            row = row[0];
            con.query(`SELECT guildMods FROM guildModerators WHERE guildId ="${message.guild.id}"`, (e, rows) => {
                let row1 = rows.map(r => r.guildMods);
                const permissionNeeded = "MANAGE_GUILD";
                if (!message.member.hasPermission(permissionNeeded, false, true, true) && !row1.includes(message.author.id)) return funcs.send(`You do not have the permission ${permissionNeeded} to use this command.`, true);
                message.channel.send(`__**O que você gostaria de fazer?**__\n\`\`\`Ativar modlogs. (Atualmente ${row.logsEnabled == "true" ? "enabled" : "disabled"}) (digite 1)\nDesativar modlogs. (digite 2)\nMude o canal (atualmente definido para ${row.logsChannel}) (type 3) (Digite exit para cancelar)\`\`\``).then(() => {
                    message.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        errors: ["time"],
                        time: 30000
                    }).then((response) => {
                        response = response.array()[0].content;
                        if (response == "1") {
                            if (row.logsEnabled == "true") return funcs.send(`Os modlogs já estão ativados!`);
                            con.query(`UPDATE guildSettings SET logsEnabled ="true" WHERE guildId = ${message.guild.id}`);
                            funcs.send(`Modlogs enabled!`);
                            con.query(`UPDATE guildCasenumber SET caseNumber = ${row.caseNumber + 1} WHERE guildId = ${message.guild.id}`);
                            //if (row.logsEnabled !== "true") return;
                            let finder = message.guild.channels.find(c => c.name == row.logsChannel);
                            if (!finder) return;
                            let embed = new richEmbed()
                                .setTitle(`Modlogs ativados.`)
                                .setTimestamp()
                                .setAuthor(message.author.username, message.author.avatarURL)
                                .setThumbnail(bot.user.avatarURL)
                                .setColor(funcs.rc())
                                .addField(`Ativado por.:`, message.author.username)
                                .addField(`Ativado em`, message.createdAt.toDateString())
                                .addField(`Número do processo:`, `#${row.caseNumber + 1}`)
                                .addField(`Mensagem:`, `[JumpTo](${message.url})`);
                            message.guild.channels.get(finder.id).send(embed);
                        } else if (response == "2") {
                            if (row.logsEnabled == "false") return funcs.send(`Modlogs are not enabled!`);
                            con.query(`UPDATE guildSettings SET logsEnabled ="false" WHERE guildId = ${message.guild.id}`);
                            funcs.send(`Modlogs disabled!`);
                            con.query(`UPDATE guildCasenumber SET caseNumber = ${row.caseNumber + 1} WHERE guildId = ${message.guild.id}`);
                            if (row.logsEnabled !== "true") return;
                            let finder = message.guild.channels.find(c => c.name == row.logsChannel);
                            if (!finder) return;
                            let embed = new richEmbed()
                                .setTitle(`Modlogs desativados.`)
                                .setTimestamp()
                                .setAuthor(message.author.username, message.author.avatarURL)
                                .setThumbnail(bot.user.avatarURL)
                                .setColor(funcs.rc())
                                .addField(`Desativado por:`, message.author.username)
                                .addField(`Desativado em`, message.createdAt.toDateString())
                                .addField(`Número do processo:`, `#${row.caseNumber + 1}`)
                                .addField(`Mensagem:`, `[JumpTo](${message.url})`);
                            message.guild.channels.get(finder.id).send(embed);
                        } else if (response == "3") {
                            message.channel.send(`__**Qual canal você gostaria de definir o canal de logs mod para?**__`).then(() => {
                                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                                    max: 1,
                                    errors: ["time"],
                                    time: 30000
                                }).then((response) => {
                                    const channel = response.array()[0].content;
                                    const check = message.guild.channels.find(c => c.name == channel);
                                    if (!check) return funcs.send("Não é um canal válido!");
                                    if (row.logsChannel == check.name) return funcs.send(`Mod logs channel already set to ${check.name}!`);
                                    con.query(`UPDATE guildSettings SET logsChannel ="${check.name}" WHERE guildId = ${message.guild.id}`);
                                    funcs.send(`Channel updated!`, false);
                                    con.query(`UPDATE guildCasenumber SET caseNumber = ${row.caseNumber + 1} WHERE guildId = ${message.guild.id}`);
                                    if (row.logsEnabled !== "true") return;
                                    let finder = message.guild.channels.find(c => c.name == row.logsChannel);
                                    if (!finder) return;
                                    let embed = new richEmbed()
                                        .setTitle(`Canal de logs mod atualizados.`)
                                        .setTimestamp()
                                        .setAuthor(message.author.username, message.author.avatarURL)
                                        .setThumbnail(bot.user.avatarURL)
                                        .setColor(funcs.rc())
                                        .addField(`Atualizado por:`, message.author.username)
                                        .addField(`Atualizado em`, message.createdAt.toDateString())
                                        .addField(`Atualizado para:`, check.name)
                                        .addField(`Case number:`, `#${row.caseNumber + 1}`)
                                        .addField(`Mensagem:`, `[JumpTo](${message.url})`);
                                    message.guild.channels.get(finder.id).send(embed);
                                }).catch((e) => {
                                    funcs.send(`Você ficou sem tempo ou ocorreu um erro!`);
                                    console.log(`Erro: ${e.message} Na guilda ${message.guild.name} comando commandName`);
                                });
                            });
                        } else {
                            funcs.send(`Comando cancelado.`);
                        }
                    }).catch((e) => {
                        funcs.send(`Você ficou sem tempo ou ocorreu um erro!`);
                        console.log(`Erro: ${e.message} Na guilda ${message.guild.name} comando modlogs`);
                    });
                });
            });
        });
    } catch (e) {
        console.error;
        funcs.send(`Oh não!Um erro ocorreu! \`${e.message}\`.`);
    }
}
};

