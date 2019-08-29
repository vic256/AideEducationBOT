const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:no:556392374172123137>  |  ${message.author.username}, vous n'avez pas la permission d'utilisé cette commande !`);
  const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discord\.gg\/\/.+)/i.test(member.user.presence.game.name));
  return message.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "Personne n'a de lien d'invitation dans son statut.");



}

module.exports.help = {
  name: "checkinvites"
}
