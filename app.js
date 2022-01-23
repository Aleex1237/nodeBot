const { Client, Intents } = require('discord.js');
const fs = require('fs');

const { token, prefix } = require('./config.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.token = token;

client.on('ready', () => {
  console.log(`someone connected! ${client.user.tag}`);
});

client.on('message', (message) => {
  if (message.content.startsWith(prefix)) {
    if (message.content.includes('help')) {
      const commands = JSON.parse(fs.readFileSync('./commands.json', 'utf8'));

      let string = ``;

      for (let i = 0; i < commands.length; i++) {
        string += `command: ${commands[i].command} function: ${commands[i].function} \n`;
      }

      message.channel.send(string);
    }

    if (message.content == 'date') {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      message.reply(`The date is: ${day}/${month}/${year}. ${message.author}`);
    }
  }
});

client.login(token, (err) => {
  if (err) console.log(err);
});
