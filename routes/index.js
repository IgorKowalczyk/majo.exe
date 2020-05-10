const dashboard = process.env.DASHBOARD;
if (dashboard === 'true') {
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Dashboard', user: req.session.user || null, name: 'majo.exe', tag: '#4560' });
});

router.get('/server', (req, res) => {
    res.redirect('https://discord.gg/f4KtqNB');
});
module.exports = router;
}