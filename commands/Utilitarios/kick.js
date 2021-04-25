const Discord = require("discord.js")
module.exports = {
    name: "kick",
    aliases: ['kickar', 'kikar'],
    async execute (client, message, args) {

const punido = message.mentions.members.first();
const motivo = args.join(" ").slice(23);

const error1 = new Discord.MessageEmbed()
.setTitle('Você não tem permissão!')
.setDescription('Você precisa da permissão ``EXPULSAR MEMBROS`` para executar este comando.')
.setColor('#EE3B3B')
if(!message.member.hasPermission("KICK_MEMBERS")) {
message.channel.send(`${message.author}`, error1)
return;
}

const error2 = new Discord.MessageEmbed()
.setTitle('Comando usado incorretamente.')
.setDescription('Você não citou o membro. Use `$kick <@membro> <motivo>`')
.setColor('#EE3B3B')
if(!punido) {
message.channel.send(`${message.author}`, error2)
return;
}

const error3 = new Discord.MessageEmbed()
.setTitle('Comando usado incorretamente.')
.setDescription('Você não colocou o motivo. Use `$kick <@membro> <motivo>`')
.setColor('#EE3B3B')
if(!motivo) {
message.channel.send(`${message.author}`, error3)
return;
}

const cembed = new Discord.MessageEmbed()
.setTitle('Punição aplicada com sucesso!')
.setDescription(`${message.author} kickou o membro ${punido}.\nMotivo: ${motivo}`)
.setColor('#00FF00')
punido.kick(motivo)
message.channel.send(cembed)

    }
}