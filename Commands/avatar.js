const Discord = require("discord.js");
module.exports = {
  name: 'avatar',
  description: 'Envois ton avatar/L\'avatar de la personne mentionnée.',
  aliases: ['icon', 'pp', 'pdp'],
  cooldown: 5,
  usage: '[USER - Optionnel]',
  args: false,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
  	let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
        let ava = user.displayAvatarURL
        let embed = {
            color:0xff0000,
            description:":bow_and_arrow: Voici l'avatar de "+ user.username+" *[url]("+ava+")*",
            image:{url:ava},
        }
     	message.channel.send("", {embed});
  },
};