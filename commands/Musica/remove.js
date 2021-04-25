const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  name: "remove",
  aliases: [],
  async execute(client, message, args) {

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("Não há fila.", message.channel).catch(console.error);
    if (!args.length) return sendError('Use `$remove <número>`');
    if (isNaN(args[0])) return sendError('Use `$remove <número>`');
    if (queue.songs.length == 1) return sendError("Não há fila.", message.channel).catch(console.error);
    if (args[0] > queue.songs.length)
      return sendError(`A fila tem apenas ${queue.songs.length} músicas!`, message.channel).catch(console.error);
    try {
      const song = queue.songs.splice(args[0] - 1, 1);
      sendError(`❌ **|** Removi a música: **\`${song[0].title}\`** da fila.`, queue.textChannel).catch(console.error);
      message.react("✅")
    } catch (error) {
      return sendError(`:notes: Ocorreu um erro.\nTipo possível: ${error}`, message.channel);
    }
  },
};
