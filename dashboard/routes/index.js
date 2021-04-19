const router = require('express').Router();

router.get('/', (req, res) => {
 res.render('index', { pageTitle: 'Dashboard', user: req.session.user || null});
});

// router.get('/servers',(req,res) =>{
//   console.log(req.session.guilds)
//   res.render('serverpage',{pageTitle:'Server',guild : req.session.guilds || null });
// })
module.exports = router;
