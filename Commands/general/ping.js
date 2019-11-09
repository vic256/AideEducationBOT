const ms = require("ms");
const Discord = require("discord.js");
module.exports = {
  name: 'ping',
  description: 'Pong !',
  aliases: ['lag', "ms"],
  cooldown: 5,
  //usage: '[TEXTE]',
  args: false,
  guildOnly: false,
  async execute(message, args, bot, embedfooter) {
  	message.channel.send("**Préparation au tir...**").then(message => {
      message.edit(`:bow_and_arrow:Pong ! - ${Math.round(bot.ping)} ms`);
    });
  },
};