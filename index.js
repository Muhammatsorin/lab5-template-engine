// ฟิก
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var session = require('express-session') 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}))

app.use(express.static('./public')); 
app.set('views', './views')
app.set('view engine', 'ejs')

app.post('/admin', urlencodedParser, (req, res) => { 
    session = req.session 
    session.email = req.body.email
    password = req.body.password
    if (session.email == ' ' && password == ' ') {
        res.send(`<html>
        <head>
        </head>
        <body>
            <h1 style="align:center;">
                Please Login Again !!
            </h1>
            <a href="/" class="btn btn-primary">Login</a>
        </body>
        </html>`)
    }
    else {
        res.render('user', { email: req.session.email })
    }
});

app.get('/logout', (req, res) => { 
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
app.listen(8000);