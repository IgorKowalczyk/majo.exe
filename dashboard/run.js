module.exports = (app) => {
 app.use('/', require('./routes/index'));
 app.use('/authorize', require('./routes/discord.js'));
 app.use('/manage',require('./routes/guildroutes'))
}
