const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  name: "loop",
  aliases: [],
  async execute(client, message, args) {

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue) {
      serverQueue.loop = !serverQueue.loop;
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `🔁  **|**  O loop está **\`${serverQueue.loop === true ? "ativado" : "desativado"}\`**`
        }
      });
    };
    return sendError("Não há nada tocando.", message.channel);
  },
};