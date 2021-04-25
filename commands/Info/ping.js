const Discord = require("discord.js");
module.exports = {
    name: "ping",
    aliases: [], // pode botar quantas vc quiser
    async execute (client, message, args) {

message.channel.send(`Meu ping é ${Math.round(client.ws.ping)}ms`);

}
}