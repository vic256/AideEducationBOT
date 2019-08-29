const snekfetch = require('snekfetch');
const Discord = require("discord.js");
module.exports = {
  name: 'succes',
  description: 'Envois une image de succès minecraft',
  aliases: ['achievement', "achievements"],
  cooldown: 5,
  usage: '[SUCCES]',
  args: true,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
      let [title, contents] = args.join(" ").split("|");
	  if(!contents) {
	    [title, contents] = ["Achievement Get!", title];
	  }
	  let rnd = Math.floor((Math.random() * 39) + 1);
	  if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
	  if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
	  if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;

	  if(title.length > 22 || contents.length > 22) return message.edit("Longeur Maximum: 22 Characteres.").then(message.delete.bind(message), 2000);
	  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
	  snekfetch.get(url)
	   .then(r=>message.channel.send("", {files:[{attachment: r.body}]}));
	  message.delete();
}
};