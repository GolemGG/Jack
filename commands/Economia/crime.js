const Discord = require('discord.js')
const ms = require("parse-ms")
module.exports = {
    name: "crime",
    aliases: [],
    async execute(client, message, args, database) {

        const db = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Cooldown`).once('value')
        const cooldown = 1800000 

        if (db.val() !== null && cooldown - (Date.now() - db.val().crime) > 0) {
            let time = ms(cooldown - (Date.now() - db.val().crime));
            message.channel.send(`Você poderá usar esse comando novamente em ${time.minutes} minutos e ${time.seconds} segundos.`)

        } else {
            const db2 = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`).once('value')
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Cooldown`)
                .update({
                    crime: Date.now()
                })
            const addGrana = Math.floor(Math.random() * (2000 - 750 + 1)) + 750;
            if (db2.val() === null) {
                database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`)
                    .update({
                        money: addGrana
                    })
            } else {
                database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`)
                    .update({
                        money: Number(db2.val().money) + Number(addGrana)
                    })
            }

            const db3 = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Level`).once('value')

            if (db3.val() === null) {
                database.ref(`Servidores/${message.guild.id}/${message.author.id}/Level`)
                    .update({
                        level: 0,
                        xp: 25
                    })
            } else {
                database.ref(`Servidores/${message.guild.id}/${message.author.id}/Level`)
                    .update({
                        xp: Number(db3.val().xp) + Number(25)
                    })
            }
            message.channel.send(`Você recebeu R$${addGrana} e 25XP realizando um crime.`)
        }

    }
}
