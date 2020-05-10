const dashboard = process.env.DASHBOARD;
if (dashboard === 'true') {
const router = require('express').Router();

const { clientId, clientSecret, scopes, redirectUri } = require('../config.json');
const fetch = require('node-fetch');
const FormData = require('form-data');


const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/authorize')
    else return next();
}

router.get('*', (req, res) => {
    if (req.session.user) return res.redirect('/');

    const authorizeUrl = `https://discord.com/api/oauth2/authorize?client_id=669517781456257054&permissions=8&redirect_uri=https%3A%2F%2Fmajobot.herokuapp.com%2Fauthorize%2Fcallback&scope=bot&response_type=code`;
    res.redirect(authorizeUrl);
});

router.get('*', (req, res) => {
    if (req.session.user) return res.redirect('/');
    
    const accessCode = req.query.code;
    if (!accessCode) throw new Error('No access code returned from Discord');

    const data = new FormData();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', redirectUri);
    data.append('scope', scopes.join(' '));
    data.append('code', accessCode);

    fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: data
    })
    .then(res => res.json())
    .then(response => {
        fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                authorization: `${response.token_type} ${response.access_token}`
            },
        })
        .then(res2 => res2.json())
        .then(userResponse => {
            userResponse.tag = `${userResponse.username}#${userResponse.discriminator}`;
            userResponse.avatarURL = userResponse.avatar ? `https://cdn.discord.com/avatars/${userResponse.id}/${userResponse.avatar}.png?size=1024` : null;

            req.session.user = userResponse;
            res.redirect('/');
        });
    });
});

router.get('*', forceAuth, (req, res) => {
    req.session.destroy();
});

module.exports = router;
}