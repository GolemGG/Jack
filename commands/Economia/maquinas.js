const Discord = require("discord.js")
module.exports = {
    name: "maquinas",
    aliases: ["machines", "máquinas", "machine", "maquina", "máquina", "maq"],
    async execute(client, message, args, database) {

        const db = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`).once('value')
        const db2 = await database.ref(`Servidores/${message.guild.id}/${message.author.id}/Maquinas`).once('value')

        const fan = args[0]
        const quantia = args[1]
        const tipo = args[2]
        const comum = "comum"

        const ajuda = new Discord.MessageEmbed()
            .setTitle('<:maquina:835257242395213854> | Máquinas')
            .setDescription('`$maquinas comprar` - Comprar máquinas;\n`$maquinas coletar` - Coletar produção;\n`$maquinas ver` - Ver informações sobre as suas máquinas.')
            .setColor('#838B83')

        if (!fan) {
            message.channel.send(`${message.author}`, ajuda)
            return;
        }

        if (fan !== "comprar" && "coletar" && "ver") {
            message.channel.send(`${message.author}, sub comando não encontrado.`, ajuda)
            return;
        }

        const compra = new Discord.MessageEmbed()
            .setTitle('<:maquina:835257242395213854> | Compra de Máquinas')
            .setDescription('Utilize `$maquinas comprar <quantia> <tipo>`\nTipos:\nComum: 2000')
            .setColor('#838B83')

        // SISTEMA DE COMPRA //

        if (!quantia) {
            message.channel.send(`${message.author}, você não definiu a quantia.`, compra)
            return;
        }

        if (!tipo) {
            message.channel.send(`${message.author}, você não definiu o tipo.`, compra)
            return;
        }

        if (tipo !== comum) {
            message.channel.send(`${message.author}, tipo de máquina inexistente`, compra)
            return;
        }

        const valor = quantia * 2000

        if (db.val().money < valor) {
            message.channel.send(`${message.author}, você não possui dinheiro suficiente. É necessário R$${valor} e você possui R$${db.val().money} na carteira.`)
            return;
        }

        if (db.val() === null) {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`)
                .update({
                    money: 0
                })
        } else {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Money`)
                .update({
                    money: Number(db.val().money) - valor
                })
        }

        if (db2.val() === null) {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Maquinas`)
                .update({
                    quantia: quantia
                })
        } else {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Maquinas`)
                .update({
                    quantia: Number(db2.val().quantia) + Number(quantia)
                })
        }

        if (tipo === comum) {
            database.ref(`Servidores/${message.guild.id}/${message.author.id}/Maquinas`)
                .update({
                    tipo: comum
                })
        }

        // SISTEMA DE COLETA //

        if (fan === "coletar") {
            message.channel.send('Opa, falta fazer isso aqui em!')
            return;
        }

        // SISTEMA DE VER //

        if (fan === "ver") {
            message.channel.send('Opa, falta fazer isso aqui em!')
            return;
        }

    }
}