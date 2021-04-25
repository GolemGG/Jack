const Discord = require("discord.js")
const ms = require("parse-ms")
module.exports = {
    name: "week",
    aliases: ["weekly", "semanal"],
    async execute(client, message, args, database) {

        const db = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Cooldown`).once('value')
        const db2 = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`).once('value')
        const cooldown = 604800000

        if (db.val() !== null && cooldown - (Date.now() - db.val().week) > 0) {
            let time = ms(cooldown - (Date.now() - db.val().week))
            message.channel.send(`Você poderá usar esse comando novamente em ${time.days} dias, ${time.hours} horas, ${time.minutes} minutos e ${time.seconds} segundos.`)
        } else {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Cooldown`)
                .update({
                    week: Date.now()
                })
        
        const addGrana = Math.floor(Math.random() * (20000 - 10500 + 1)) + 10500

        if (db2.val() === null) {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`)
                .update({
                    money: addGrana
                })
            message.channel.send(`Você recebeu R$${addGrana} no seu semanal!`)
        } else {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`)
                .update({
                    money: Number(db2.val().money) + Number(addGrana)
                })
            message.channel.send(`Você recebeu R$${addGrana} no seu semanal!`)
        }}
    }
}
