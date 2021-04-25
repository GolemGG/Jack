const { Util, MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
    name: "skip",
    aliases: [],
    async execute (client, message, args) {

    const channel = message.member.voice.channel
    if (!channel)return sendError("Você não está em nenhum canal de voz!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Não há nada tocando.", message.channel);
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Música pulada!")
      .setColor("YELLOW")
      .setTitle("A música foi pulada com sucesso!")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: A música foi pausada e a fila foi limpa.: ${error}`, message.channel);
      }
    message.react("✅")
  },
};
