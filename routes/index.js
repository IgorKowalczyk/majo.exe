const dashboard = process.env.DASHBOARD;
if (dashboard === 'true') {
const router = require('express').Router();
const { name, tag, authorwebsite, github } = require('../dashboard.json');
  
router.get('/', (req, res) => {
    res.render('index', { pageTitle: name + tag + ' - An advanced Discord Bot', authorwebsite: authorwebsite, github: github, user: req.session.user || null, name: name, tag: tag });
});

router.get('/server', (req, res) => {
    res.redirect('https://discord.gg/f4KtqNB');
});
module.exports = router;
}