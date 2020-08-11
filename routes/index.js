const dashboard = process.env.DASHBOARD;
if (dashboard === 'true') {
const router = require('express').Router();
const { name, tag, authorwebsite, github, mobile, twitter, launch, pagename, description, image, verification, server, email} = require('../dashboard.json');
  
router.get('/', (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('index', { pageTitle: name + tag + ' - An advanced Discord Bot', fullUrl: fullUrl, verification: verification, authorwebsite: authorwebsite, github: github, email: email, server: server, mobile: mobile, pageName: pagename, description: description, image: image, twitter: twitter, launch: launch, user: req.session.user || null, name: name, tag: tag });
});

if (server) {
router.get('/server', (req, res) => {
    res.redirect(server);
});
}

router.get('*', (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      res.status(404).render('404', { pageTitle: '404', fullUrl: fullUrl, verification: verification, authorwebsite: authorwebsite, github: github, email: email, server: server, mobile: mobile, pageName: pagename, description: description, image: image, twitter: twitter, launch: launch, user: req.session.user || null, name: name, tag: tag });
});
module.exports = router;
}