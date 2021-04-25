const Discord = require('discord.js')
module.exports = {
    name: "embed",
    aliases: [],
    async execute(client, message, args) {

        const error1 = new Discord.MessageEmbed()
            .setTitle('Você não tem permissão!')
            .setDescription('Você precisa ter a permissão `GERENCIAR MENSAGENS` para executar esse comando.')
            .setColor('#FF3131')
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(`${message.author}`, error1)
            return;
        }

        const title = args.join(" ").split(" | ")[0]
        const desc = args.join(" ").split(" | ")[1]
        const cor = args.join(" ").split(" | ")[2]
        const nome = args.join(" ").split(" | ")[3]

        const error2 = new Discord.MessageEmbed()
            .setTitle("Você não inseriu um texto (use | para separar os argumentos)")
            .setDescription("Exemplo: `$embed <titulo> | <mensagem> | <cor> | <footer>`.")
            .setTimestamp()
            .setColor('#FF3131')
        if (!title) {
            message.channel.send(`${message.author}`, error2)
            return;
        }

        const error3 = new Discord.MessageEmbed()
            .setTitle("Você não inseriu uma mensagem (use | para separar os argumentos)")
            .setDescription("Exemplo: `$embed <titulo> | <mensagem> | <cor> | <footer>`.")
            .setTimestamp()
            .setColor('#FF3131')
        if (!desc) {
            message.channel.send(`${message.author}`, error3)
            return;
        }

        const error4 = new Discord.MessageEmbed()
            .setTitle('Você não inseriu uma cor (use | para separar os argumentos)')
            .setDescription("Exemplo: `$embed <titulo> | <mensagem> | <cor> | <footer>`.")
            .setTimestamp()
            .setColor('#FF3131')
        if (!cor) {
            message.channel.send(`${message.author}`, error4)
            return;
        }

        const error5 = new Discord.MessageEmbed()
            .setTitle('Você não inseriu um footer (use | para separar os argumentos)')
            .setDescription("Exemplo: `$embed <titulo> | <mensagem> | <cor> | <footer>`.")
            .setTimestamp()
            .setColor('#FF3131')
        if (!nome) {
            message.channel.send(`${message.author}`, error5)
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`${title}`)
            .setDescription(`${desc}`)
            .setColor(`${cor}`)
            .setFooter(`${nome}`)
        message.channel.send(embed)
        message.delete()
    }
}