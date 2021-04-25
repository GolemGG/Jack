const Discord = require("discord.js")
module.exports = {
    name: 'status',
    aliases: [],
    async execute(client, message, args) {

        const error1 = new Discord.MessageEmbed()
            .setTitle('Você não tem permissão!')
            .setDescription('Você precisa da permissão ``ADMINISTRADOR`` para executar este comando.')
            .setColor('#EE3B3B')
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(`${message.author}`, error1)
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setTitle('Defina meu status!')
            .setDescription('<:online:828444397577306144> - Online\n<:idle:828444418658533396> - Ausente\n<:ocupado:828444444423356437> - Ocupado')
            .setColor('#BEBEBE')
        message.channel.send(`${message.author}`, embed).then(async msg => {
            await msg.react('<:online:828444397577306144>')
            await msg.react('<:idle:828444418658533396>')
            await msg.react('<:ocupado:828444444423356437>')

            const filtro = (reaction, user) => user.id === message.author.id;
            const collector = msg.createReactionCollector(filtro, { time: 60000 });

            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.id === "828444397577306144") {
                    client.user.setStatus('online')
                    msg.channel.send('Status alterado para **ONLINE**!')
                    msg.delete()
                }

                if (reaction.emoji.id === "828444418658533396") {
                    client.user.setStatus('idle')
                    msg.channel.send('Status alterado para **AUSENTE**!')
                    msg.delete()
                }

                if (reaction.emoji.id === "828444444423356437") {
                    client.user.setStatus('dnd')
                    msg.channel.send('Status alterado para **OCUPADO**!')
                    msg.delete()
                }


            }

            )
        })


    }
}