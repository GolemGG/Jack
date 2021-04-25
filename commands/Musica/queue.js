const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");
const util = require("../../util/pagination");

module.exports = {
    name: "queue",
    aliases: ["list"],

    async execute(client, message, args) {

        const permissions = message.channel.permissionsFor(message.client.user);
        if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"])) return sendError("Preciso da permissão ``ADICIONAR REAÇÕES`` e ``GERENCIAR MENSAGENS``.", message.channel);

        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError("Não há nada tocando.", message.channel);

        const que = queue.songs.map((t, i) => `\`${++i}.\` | [\`${t.title}\`](${t.url}) - [<@${t.req.id}>]`);

        const chunked = util.chunk(que, 10).map((x) => x.join("\n"));

        const embed = new MessageEmbed()
            .setAuthor("Fila:")
            .setThumbnail(message.guild.iconURL())
            .setColor("BLUE")
            .setDescription(chunked[0])
            .addField("Tocando agora:", `[${queue.songs[0].title}](${queue.songs[0].url})`, true)
            .addField("Canal de Texto:", queue.textChannel, true)
            .addField("Canal de Voz:", queue.voiceChannel, true)
            .setFooter(`O atual volume é ${queue.volume} Página 1 de ${chunked.length}.`);
        if (queue.songs.length === 1) embed.setDescription(`Não há músicas para tocar mais.`);

        try {
            const queueMsg = await message.channel.send(embed);
            if (chunked.length > 1) await util.pagination(queueMsg, message.author, chunked);
        } catch (e) {
            msg.channel.send(`Um erro ocorreu: ${e.message}.`);
        }
    }}