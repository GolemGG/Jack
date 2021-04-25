const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const { token, prefix } = require('./config.json')
require("dotenv").config()
const firebase = require('firebase')
client.queue = new Map()


var configf = {
  apiKey: "AIzaSyB6LEuw_HN9ziOJDMGtjgwzo43Du9riBF0",
  authDomain: "golem-68ca2.firebaseapp.com",
  projectId: "golem-68ca2",
  storageBucket: "golem-68ca2.appspot.com",
  messagingSenderId: "180568685246",
  appId: "1:180568685246:web:b96b83e28b6efc53433cef"
};
firebase.initializeApp(configf);
const database = firebase.database();

client.commands = new Discord.Collection()

// Carregar subpastas do commands

// Info
fs.readdir("./commands/Info", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/Info/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

// Dev
fs.readdir("./commands/Dev", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/Dev/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

// Utilitários
fs.readdir("./commands/Utilitarios", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/Utilitarios/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

// Músicas
fs.readdir("./commands/Musica", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/Musica/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

// Ecomomia
fs.readdir("./commands/Economia", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/Economia/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

// Linha 8 a 19: Carregar comandos e setar eles na Collection

client.on('ready', async () => {
  console.log(`${client.user.tag} foi inciado com sucesso.`)
  client.user.setActivity({ name: `o Golem#0001 me programar!`, type: `WATCHING` });
  client.channels.cache.get('828383984207659018').send('Liguei!')
})
// Linha 21 a 23: Evento Ready

client.on('message', async message => {
  if (message.author.bot || !message.content.toLowerCase().startsWith(prefix)) return; // verificar se o user é um bot ou se a mensagem começa com o prefixo
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();
  try {
    const getCommand = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName)); // puxa o comando e as aliases
    if (!getCommand) return message.reply(`esse comando não existe.`) // retorna mensagem se o comando não existe

    getCommand.execute(client, message, args, database) // executa o comando
  } catch (err) {
    message.reply(`houve um erro ao executar esse comando.`) // mensagem de erro se o comando não funcionar
    console.log(err) // mostrar erro no console
  }
})
SOUNDCLOUD: process.env.SOUNDCLOUD_CLIENT_ID
client.login(token) // faz login no bot