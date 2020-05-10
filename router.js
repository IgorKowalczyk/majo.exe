module.exports = (app) => {
    // '/'
const dashboard = process.env.DASHBOARD;
if (dashboard === 'true') {
    app.use('/', require('./routes/index'));


    // '/authorize'
    app.use('/authorize', require('./routes/discord'));
}
}