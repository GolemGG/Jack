const Discord = require("discord.js")
const ms = require("parse-ms")
module.exports = {
    name: 'local',
    aliases: ['lugar'],
    async execute(client, message, args, database) {

        message.delete()

        const db = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Cooldown`).once('value')
        const cooldown = 10000

        if (db.val() !== null && cooldown - (Date.now() - db.val().local) > 0) {
            let time = ms(cooldown - (Date.now() - db.val().local));
            message.channel.send(`Você poderá usar esse comando novamente em ${time.seconds} segundos.`)
            return;
        } else {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Cooldown`)
                .update({
                    local: Date.now()
                })
        }

        const db2 = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Local`).once('value')

        const loja = 'Mercado'
        const agencia = 'Agencia'

        if (db2.val() == null) {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Local`)
                .update({
                    local: loja
                })
        }

        const embed = new Discord.MessageEmbed()
            .setTitle('Bip, bip... Seu uber chegou!')
            .setAuthor(`Você está em ${db2.val().local}`)
            .setDescription('Para onde deseja ir?\n🛒 - Mercado\n💼 - Agência de Empregos')
            .setThumbnail('https://logopng.net/wp-content/uploads/2020/07/logo-uber-png-icon.png')
            .setColor('WHITE')
        message.channel.send(`${message.author}`, embed).then(async msg => {
            await msg.react('🛒')
            await msg.react('💼')

            const filtro = (reaction, user) => user.id === message.author.id;
            const collector = msg.createReactionCollector(filtro, { time: 60000 });

            collector.on('collect', (reaction, user) => {

                if (reaction.emoji.name === "🛒") {
                    if (db2.val().local == "Mercado") {
                        message.channel.send(`${message.author}, você já está no Mercado.`)
                        msg.delete()
                        return;
                    }
                    database.ref(`Servidores/${message.guild.id}/${message.author.id}/Local`)
                        .update({
                            local: loja
                        })
                    message.channel.send(`${message.author}, você chegou ao seu destino! R$15 foi descontado do seu dinheiro.`)
                    msg.delete()
                }

                if (reaction.emoji.name === "💼") {
                    if (db2.val().local == "Agencia") {
                        message.channel.send(`${message.author}, você já está na Agência de Empregos.`)
                        msg.delete()
                        return;
                    }
                    database.ref(`Servidores/${message.guild.id}/${message.author.id}/Local`)
                        .update({
                            local: agencia
                        })
                    message.channel.send(`${message.author}, você chegou ao seu destino! R$15 foi descontado do seu dinheiro.`)
                    msg.delete()
                }
            }
            )
        })
    }
}