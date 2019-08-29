const superagent = require("superagent");
const Discord = require("discord.js");
module.exports = {
  name: 'hibp',
  description: 'Savoir si votre est dans une base de donnée piraté (Réalisé avec HaveIBeenPwned)',
  aliases: ['haveibeenpwned'],
  cooldown: 5,
  usage: '[ADRESSE MAIL]',
  args: true,
  guildOnly: false,
  async execute(message, args, bot, embedfooter) {
    await message.delete(300);
    let {
        body
    } = await superagent
        .get(`https://haveibeenpwned.com/api/v2/breachedaccount/${args[0]}`)
        .catch(err => {
            message.author.send(`Ouf pas de résultat pour cette adresse mail ! Aucune base de donnée piraté la contient ! Adresse mail :\`\`${args[0]}\`\``)
            message.reply('<:yes:556392507899117570> Résulat envoyé en message privé ! ')
        });

    let out = `Oh non ! ton adresse mail est sur une base de donnée piraté ! Adresse mail : ${args[0]}`;
    let po = 0;
    const format = body.forEach(i => {
        po++;
        out += `\n${po}.   ${i.Name}   breached on:   ${i.BreachDate}`
    })
    message.author.send(out);
    message.reply('<:yes:556392507899117570> Résulat envoyé en message privé ! ')
  },
};