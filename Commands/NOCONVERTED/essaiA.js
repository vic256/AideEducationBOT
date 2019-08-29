const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports.run = async (bot, message, args) => {
    const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('./img.jpg');

	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	const attachment = new Discord.Attachment(canvas.toBuffer(), 'byvic.png');

	message.channel.send(`Ceci est un essai pour vic :) !`, attachment);

}

module.exports.help = {
  name: "essaiA"
}
