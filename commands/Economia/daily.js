const Discord = require('discord.js')
const ms = require('parse-ms')
module.exports = {
    name: "daily",
    aliases: ["diario"],
    async execute(client, message, args, database) {

        const db = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Cooldown`).once('value')
        const db2 = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`).once('value')
        const cooldown = 86400000

        if (db.val() !== null && cooldown - (Date.now() - db.val().daily) > 0) {
            let time = ms(cooldown - (Date.now() - db.val().daily))
            message.channel.send(`Você poderá usar esse comando novamente em ${time.hours} horas, ${time.minutes} minutos e ${time.seconds} segundos.`)
        } else {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Cooldown`)
                .update({
                    daily: Date.now()
                })

            const addGrana = Math.floor(Math.random() * (4000 - 1500 + 1)) + 1500;

            if (db2.val() === null) {
                database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`)
                    .update({
                        money: addGrana
                    })
                message.channel.send(`Você recebeu R$${addGrana} no seu diário!`)
            } else {
                database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`)
                    .update({
                        money: Number(db2.val().money) + Number(addGrana)
                    })
                message.channel.send(`Você recebeu R$${addGrana} no seu diário!`)
            }

        }


    }
}