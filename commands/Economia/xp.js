const Discord = require("discord.js")
module.exports = {
    name: "xp",
    aliases: ["level"],
    async execute(client, message, args, database) {

        const db = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Level`).once('value')

        if (db.val() == null) {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Level`)
                .update({
                    xp: 0,
                    level: 0
                })
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle('Seu Level:')
                .setDescription(`Seu XP é: **${db.val().xp}**\nSeu Level é: **${db.val().level}**`)
                .setColor('GREEN')
            message.channel.send(`${message.author}`, embed)
        }

    }
}