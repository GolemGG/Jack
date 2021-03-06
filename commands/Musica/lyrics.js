const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const sendError = require("../../util/error");
const splitlyrics = require("../../util/pagination");

module.exports = {
    name: "lyrics",
    aliases: ["ly"],
    async execute(client, message, args) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError("Não há nada tocando.", message.channel).catch(console.error);

        let lyrics = null;

        try {
            lyrics = await lyricsFinder(queue.songs[0].title, "");
            if (!lyrics) lyrics = `Não encontrei a letra de ${queue.songs[0].title}.`;
        } catch (error) {
            lyrics = `Não encontrei a letra de ${queue.songs[0].title}.`;
        }
        const splittedLyrics = splitlyrics.chunk(lyrics, 1024);

        let lyricsEmbed = new MessageEmbed()
            .setAuthor(`${queue.songs[0].title} — Letra`)
            .setThumbnail(queue.songs[0].img)
            .setColor("YELLOW")
            .setDescription(splittedLyrics[0])
            .setFooter(`Página 1 de ${splittedLyrics.length}.`)
            .setTimestamp();

        const lyricsMsg = await message.channel.send(lyricsEmbed);
        if (splittedLyrics.length > 1) await splitlyrics.pagination(lyricsMsg, message.author, splittedLyrics);
    },
};