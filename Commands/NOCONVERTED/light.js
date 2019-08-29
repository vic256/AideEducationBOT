const Discord = require("discord.js");
const watched = new Discord.Collection();

module.exports.run = async (bot, message, args) => {
  const channel = (bot.channels.get(args[0]) || message.channel);
  if(watched.has(channel.id)) {
    watched.get(channel.id).stop();
    message.channel.send("On");
    return watched.delete(channel.id);
  }

  message.channel.send("Off");
  const collector = channel.createMessageCollector(()=>true);
  collector.on("Collection", (collected, collector) => console.log(`[WATCH][${collected.author.username}][#${collected.channel.name}]${collected.content}`));
  watched.set(channel.id, collector);
};


module.exports.help = {
  name: "light"
}
//COMMANDE DESACTIVE : MODULE EN CONSTRUCTION