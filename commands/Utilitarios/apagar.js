const Discord = require("discord.js");
module.exports = {
    name: "apagar",
    aliases: ['clear', 'clean'], // pode botar quantas vc quiser
    async execute (client, message, args) {

message.delete()
const quantidade = args[0]

const error1 = new Discord.MessageEmbed()
.setTitle('Você não tem permissão!')
.setDescription('Você precisa da permissão ``GERENCIAR MENSAGENS`` para executar este comando.')
.setColor('#EE3B3B')
if(!message.member.hasPermission("MANAGE_MESSAGES")) {
message.channel.send(`${message.author}`, error1)
return;
}

const error4 = new Discord.MessageEmbed()
.setTitle('Comando usado incorretamente.')
.setDescription('Insira a quantia. `$apagar <quantia>`')
.setColor('#EE3B3B')
if(!quantidade) {
message.channel.send(`${message.author}`, error4)
return;
}

const error2 = new Discord.MessageEmbed()
.setTitle('Comando usado incorretamente.')
.setDescription('O número deve ser maior que 2. `$apagar <quantia>`')
.setColor('#EE3B3B')
if(quantidade < 2) {
message.channel.send(`${message.author}`, error2)
return;
}

const error3 = new Discord.MessageEmbed()
.setTitle('Comando usado incorretamente.')
.setDescription('O número deve ser menor que 100. `$apagar <quantia>`')
.setColor('#EE3B3B')
if(quantidade > 100) {
message.channel.send(`${message.author}`, error3)
return;
}

message.channel.bulkDelete(quantidade).then(() => {
const sucess = new Discord.MessageEmbed()
.setTitle('Mensagens apagadas.')
.setDescription(`${quantidade} mensagens foram apagadas por ${message.author}`)
.setColor('#32CD32')
message.channel.send(sucess)
})

    }
}
