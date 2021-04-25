const Discord = require("discord.js")
module.exports = {
    name: "saldo",
    aliases: ["carteira", "money", "dinheiro"],
    async execute(client, message, args, database) {

        const db = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`).once('value')

        if (db.val() === null) {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`)
                .update({
                    money: 0
                })
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle('Sua Carteira:')
                .setDescription(`Seu saldo é de: **${db.val().money}**`)
                .setColor('GREEN')
            message.channel.send(`${message.author}`, embed)
        }
    }
}