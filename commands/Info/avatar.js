const Discord = require("discord.js")
module.exports = {
    name: "avatar",
    aliases: [],
    async execute (client, message, args) {

message.delete()

let usuario = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.fetch(args[0]);

if(usuario instanceof Promise) {
    await usuario.then(u => usuario = u).catch(err => usuario = null);
    }

if(!usuario) {
   usuario = message.author
}

const cembed = new Discord.MessageEmbed()
.setTitle(`🖼️ | Avatar de ${usuario.username}`)
.setImage(`${usuario.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 })}`)
.setColor('RANDOM')
message.channel.send(`${message.author}`, cembed)

}}
