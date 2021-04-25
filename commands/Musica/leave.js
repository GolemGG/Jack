const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
    name: "leave",
    aliases: ["dc", "quit"],
    async execute(client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("Você não está em nenhum canal de voz.", message.channel);
        if (!message.guild.me.voice.channel) return sendError("Eu não estou em nenhum canal de voz.", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("Tentando sair de um canal...", message.channel);
        }

        const Embed = new MessageEmbed()
            .setAuthor("Me retirei com sucesso!")
            .setColor("GREEN")
            .setTitle("Saída!")
            .setDescription("🎶 Já saí do canal.")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("🎶 Já saí do canal."));
    },
};
