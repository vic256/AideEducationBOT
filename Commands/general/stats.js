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
  message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${bot.users.size.toLocaleString()}
• Servers    :: ${bot.guilds.size.toLocaleString()}
• Channels   :: ${bot.channels.size.toLocaleString()}
• Discord.js :: v${Discord.version}
• Commands   :: 29
• Node       :: ${process.version}`, {code: "asciidoc"});
 message.channel.send("**Attention : ** Certaines informations comme le nombre de serveurs ne sont pas a prendre en compte sur le bot AideEducation. ")



  },
};