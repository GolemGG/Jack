const Discord = require("discord.js");
module.exports = {
    name: "botinfo",
    aliases: [], // pode botar quantas vc quiser
    async execute (client, message, args) {

message.delete()

let dias = 0;
let semanas = 0;

let uptime = ``;
let totalSegundos = (client.uptime / 1000);
let horas = Math.floor(totalSegundos / 3600);
totalSegundos %= 3600;
let minutos = Math.floor(totalSegundos / 60);
let segundos = Math.floor(totalSegundos % 60);

if(horas > 23){
  dias = dias + 1;
  horas = 0;
}

if(dias == 7){
dias = 0;
semanas = semanas + 1;
}

if(semanas > 0){
  uptime += `${semanas} semanas, `;
}

if(minutos > 60){
  minutos = 0;
}

uptime += `${dias}d, ${horas}h, ${minutos}m, ${segundos}s`;

const cembed = new Discord.MessageEmbed()
.setTitle('<:jack1:826630763943559169> **|** Informações do Jack:')
.setDescription("⠀")
.setColor('#4682B4')
.addFields(
    { name: '<:dev:825861121197867058> **|** Criador:', value: '<@710627477416050818>', inline: true },
    { name: '<a:load:825863138578268181> **|** Tempo Acordado:', value: `${uptime}`, inline: true },
    { name: '<:network:825858340281778187> **|** Ping:', value: `${Math.round(client.ws.ping)}ms`, inline: true },
    { name: '❄️ **|** Meu prefixo:', value: '$', inline: true },
    { name: '<:settings:825858017810579487> **|** Linguagem:', value: 'JavaScript', inline: true },
    { name: '<:review:825858101806235758> **|** Servidores:', value: `${client.guilds.cache.size}`, inline: true },
)
.setThumbnail('https://images-ext-2.discordapp.net/external/UqKvC4Vaw73-KFHKF6QCGvvLvMOrgk6dF87CDvZPf8s/%3Fsize%3D2048/https/cdn.discordapp.com/icons/819343763213385778/b157865d92f045cc519b91149bc7bd26.png?width=473&height=473')


message.channel.send(`${message.author}`, cembed)
    }
}
