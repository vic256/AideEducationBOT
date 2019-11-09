const Discord = require("discord.js");
const Canvas = require('canvas');
module.exports = {
  name: 'canvas',
  description: 'Private command',
  //aliases: ['essai', 'ccc'],
  cooldown: 5,
  usage: '[TEXTE]',
  args: false,
  guildOnly: true,
  async execute(message, args, bot, embedfooter) {
  	
  	const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font-
	let fontSize = 300;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px LemonMilk`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
  	const canvas = Canvas.createCanvas(3840, 2160);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('http://vic256.zd.fr/files/AE/wallpaper.jpg');
	let member = message.author
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(10, 0, canvas.width, canvas.height);
	ctx.font = '400px LemonMilk';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Bienvenue', canvas.width / 5, canvas.height / 1.8);
	ctx.font = applyText(canvas, `${member.username} !`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.username} !`, canvas.width / 3, canvas.height / 1.4);

	ctx.beginPath();
	ctx.arc(125*4, 125*4, 100*4, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();


	const avatar = await Canvas.loadImage(message.author.avatarURL);
	ctx.drawImage(avatar, 25*4, 25*4, 200*3, 200*3);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'canvas.png');
	message.channel.send(`Test canvas, ${message.author} !`, attachment);

  },
}; 