const Discord = require("discord.js")
const moment = require("moment")
module.exports = {
    name: "serverinfo",
    aliases: [],
    async execute (client, message, args) {

message.delete()

const servidor = message.guild

const cEmbed = new Discord.MessageEmbed()
.setTitle(`<:IconServerDiscovery:827703447528013834> | Informações do Servidor:`)
.setDescription("⠀")
.addFields (
    { name: '<:IconStoreChannel:827312099889905666> | Nome:', value: `${servidor.name}`, inline: true },
    { name: '<:ItemPlan:827307794540527617> | ID:', value: `${servidor.id}`, inline: true},
    { name: '<:IconSwitchIconOnGreen:827705181096509470> | Criado em:', value: `${moment(servidor.createdAt).format('DD/MM/YYYY')}`, inline: true},
    { name: '<:users:825857846356344853> | Quantia de Membros:', value: `${servidor.memberCount}`, inline: true},
    { name: '<:7485_server_boost:828038263561650207> | Quantia de Boosts:', value: `${servidor.premiumSubscriptionCount}`, inline: true},
    { name: '<:id:827313101241712671> | Dono:', value: `${servidor.owner} (${servidor.ownerID})`, inline: true},
)
.setThumbnail(`${servidor.iconURL({dynamic: true, size: 2048})}`)
.setColor('RANDOM')

message.channel.send(`${message.author}`, cEmbed)












    }
}