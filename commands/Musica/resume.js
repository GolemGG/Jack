const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
    name: "resume",
    aliases: ["unpause"],
    async execute (client, message, args) {

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Música despausada!")
      .setColor("YELLOW")
      .setAuthor("A música foi despausada!")
      return message.channel.send(xd);
    }
    return sendError("Não há nada tocando.", message.channel);
  },
};