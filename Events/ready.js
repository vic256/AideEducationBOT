module.exports = (bot) => {
    console.log(`[AE-LOG] - ${bot.user.username} est en ligne dans ${bot.guilds.size} serveur !`);
    bot.user.setPresence({ game: { name: 'AideEducation | <help', type: 'WATCHING'} , status: 'idle'})
};