const express = require('express');
const app = express();

let port = require('./config.js').port || 3000;
app.set('port', port);

const session = require('express-session');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(session({
 secret: process.env.SESSION_SECRET,
 resave: false,
 saveUninitialized: false,
 expires: 300000,
}));
require('./dashboard/run')(app);

app.listen(port, () => console.info(`Rodando na porta ${port}`));