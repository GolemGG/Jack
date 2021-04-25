const Discord = require("discord.js")
const fetch = require("node-fetch") // npm i node-fetch
module.exports = {
    name: "docs",
    aliases: [],
    async execute (client, message, args) {

const query = args.join(" ") // aqui guardaremos os argumentos do usuário em uma variável.
if (!query) {
  message.reply("Você não inseriu qual documentação deseja.") // aqui verificamos se o usuário colocou um argumento e se não, mandar uma mensagem de erro.
}
fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`) // aqui faremos o request na URL da API do discord.js
.then(res => res.json()) // aqui transformaremos o resultado da request em um JSON.
.then(json => {
  message.channel.send({ embed: json }).catch(() => message.reply("Não encontrei nada."))
  // E por fim, mandaremos o resultado do JSON em uma embed. E se ele não achar nenhum resultado para a pesquisa, retorna uma mensagem de erro.
})
    }}
