const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  name: "pause",
  aliases: [],

  async execute(client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      try {
        serverQueue.connection.dispatcher.pause()
      } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: A música foi pausada.: ${error}`, message.channel);
      }
      let xd = new MessageEmbed()
        .setDescription("⏸ Música pausada!\nUse `$resume` para despausar.")
        .setColor("YELLOW")
        .setTitle("A música foi pausada com sucesso!")
      return message.channel.send(xd);
    }
    return sendError("Não há nada tocando.", message.channel);
  },
};