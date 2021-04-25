const Discord = require("discord.js")
module.exports = {
    name: "empregos",
    aliases: ['emprego', 'profissao', 'profissoes'],
    async execute(client, message, args) {

const db = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Trabalho`)


    }
}