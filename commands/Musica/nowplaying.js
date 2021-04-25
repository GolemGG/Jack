const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  async execute(client, message, args) {

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Não há nada tocando.", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Tocando agora!")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Nome:", song.title, true)
      .addField("Duração:", song.duration, true)
      .addField("Solicitada por:", song.req.tag, true)
      .setFooter(`Visualizações: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  }
}