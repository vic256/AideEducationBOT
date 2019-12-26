module.exports = (bot, message) => {
    if (message.author.bot) return;
	const args = message.content.split(" ");
	let text = args.slice(0).join(" ");
	if(message.channel.type === 'dm') return console.log(`--> Message privé reçu <--\nUtilisateur : ${message.athor.username}#${message.author.discriminator} - ${message.author.id}\nMessage : ${text}`);
};