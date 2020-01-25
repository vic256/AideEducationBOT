const qrcode = require("qrcode");
const tempy = require("tempy");
const Discord = require("discord.js");
module.exports = {
  name: 'qrcode',
  description: 'Génère un QRCode',
  aliases: ['qr', 'flashcode'],
  cooldown: 5,
  usage: '[LIEN/TEXTE]',
  args: true,
  guildOnly: false,
  execute(message, args, bot, embedfooter) {
    const qrOutput = tempy.file({ extension: "png" });
    message.channel.startTyping();
        qrcode.toFile(qrOutput, args.slice(0).join(" "), { margin: 1 }, (error) => {
            if (error) throw new Error(error);
            message.channel.stopTyping();
            message.reply('Votre qr code est près !')
            message.channel.send({
                files: [{
                    attachment: qrOutput,
                    name: "qr.png"
                }]
            });
        });
    
  },
};