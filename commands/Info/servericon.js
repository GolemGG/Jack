const Discord = require('discord.js')
module.exports = {
    name: "servericon",
    aliases: ['icon'],
    async execute (client, message, args) {

const servidor = message.guild

const cembed = new Discord.MessageEmbed()
.setTitle(`🖼️ | Icon de ${servidor.name}:`)
.setImage(`${servidor.iconURL({dynamic: true, size: 2048})}`)

message.channel.send(cembed)
}}