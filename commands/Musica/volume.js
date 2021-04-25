const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  name: "volume",
  aliases: ["vol"],
  async execute(client, message, args) {

    const channel = message.member.voice.channel;
    if (!channel) return sendError("Você não está em nenhum canal de voz.", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Não há nada tocando.", message.channel);
    if (!serverQueue.connection) return sendError("Não há nada tocando.", message.channel);
    if (!args[0]) return message.channel.send(`O volume atual é: **${serverQueue.volume}**`);
    if (isNaN(args[0])) return message.channel.send(':notes: Apenas números!').catch(err => console.log(err));
    if (parseInt(args[0]) > 150 || (args[0]) < 0) return sendError('Você não pode colocar volume maior que 150 ou menos que 0.', message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
      .setDescription(`O volume foi setado para: **${args[0] / 1}/100**`)
      .setAuthor("Volume alterado")
      .setColor("BLUE")
    return message.channel.send(xd);
  },
};