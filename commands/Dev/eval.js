const Discord = require("discord.js");
module.exports = {
    name: "eval",
    aliases: [], // pode botar quantas vc quiser
    async execute (client, message, args) {
    if (!['792041051195310130', '710627477416050818'].includes(message.author.id)) return;
    try {
        let codein = args.join(" ");
        if (!codein) return;
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
            .setColor('#F2C438')
            .addField('\:inbox_tray: Entrada', `\`\`\`js\n${codein}\`\`\``)
            .addField('\:outbox_tray: Saída', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed);
    } catch (e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}
}
