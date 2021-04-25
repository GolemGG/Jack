const Discord = require("discord.js")
module.exports = {
    name: "userinfo",
    aliases: [],
    async execute (client, message, args) {

message.delete()

const moment = require('moment');

let usuario = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.fetch(args[0]);

if(usuario instanceof Promise) {
    await usuario.then(u => usuario = u).catch(err => usuario = null);
    }

if(!usuario) {
    usuario = message.author
}

const cembed = new Discord.MessageEmbed()
.setTitle(`<:ItemPlan:827307794540527617> | Informações de ${usuario.tag}`)
.setDescription("⠀")
.addFields (
     { name: '<:IconFriends:827312149223309343> **|** Usuário:', value: `${usuario.username}`, inline: true },
     { name: '<:IconStoreChannel:827312099889905666> **|** Usuário + TAG:', value: `${usuario.tag}`, inline: true },
     { name: '<:id:827313101241712671> **|** ID do Usuário:', value: `${usuario.id}`, inline: true},
     { name: '<:Calendario:827322344124579851> **|** Conta criada em', value: `${moment(usuario.createdAt).format('DD/MM/YYYY HH:MM:ss')}`, inline: true},
)
.setColor('RANDOM')
.setThumbnail(`${usuario.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 })}`)
message.channel.send(`${message.author}`, cembed)

    }
}