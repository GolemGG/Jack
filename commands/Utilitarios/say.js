const Discord = require('discord.js')
module.exports = {
    name: "say",
    aliases: [],
    async execute(client, message, args) {

        const say = args.join(" ")

        const error1 = new Discord.MessageEmbed()
            .setTitle('Você não tem permissão.')
            .setDescription('Você precisa da permissão ``GERENCIAR MENSAGENS`` para utilizar esse comando.')
            .setColor('#EE3B3B')
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(`${message.author}`, error1)
            return;
        }

        const error2 = new Discord.MessageEmbed()
            .setTitle('Comando usado incorretamente.')
            .setDescription('Você não inseriu a mensagem. ``$say <mensagem>``')
            .setColor('#EE3B3B')
        if (!say) {
            message.channel.send(`${message.author}`, error2)
        }

        message.channel.send(`${say}`)
        message.delete()
    }
}