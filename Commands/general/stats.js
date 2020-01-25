const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");
module.exports = {
  name: 'stats',
  description: 'Donne les informations du bot',
  aliases: ['botinfo', 'bi', 'stat'],
  cooldown: 5,
  //usage: '[TEXTE]',
  args: false,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
  	const duration = moment.duration(bot.uptime).format(" D [s], H [hrs], m [mins], s [secs]");
  message.channel.send(`= STATISTIQUES =
• RAM  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Allumé depuis     :: ${duration}
• Utilisateurs      :: ${bot.users.size.toLocaleString()}
• Serveurs    :: ${bot.guilds.size.toLocaleString()}
• Salons   :: ${bot.channels.size.toLocaleString()}
• Discord.js :: v${Discord.version}
• Commandes   :: ⚠️
• Node       :: ${process.version}`, {code: "asciidoc"});

  },
};