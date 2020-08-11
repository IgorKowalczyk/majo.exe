module.exports = (app) => {
    const dashboard = process.env.DASHBOARD;
    if (dashboard === 'true') {
        // main index
        app.use('/', require('./routes/index'));
        // Authorize page
        app.use('/authorize', require('./routes/discord'));
        // 404
        app.use((req, res, next) => {
         res.status(404).render('404');
        });
    }
}