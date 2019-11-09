const Discord = require("discord.js");
module.exports = {
  name: 'invite',
  description: 'Ce bot ne peut pas être invité :neutral_face:',
  aliases: ['invitation'],
  cooldown: 5,
  //usage: '[TEXTE]',
  args: false,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
  	message.channel.send("Hey hey ! Je suis un bot réservé a AideEducation tu ne peux pas m'inviter :neutral_face:")
  },
};