var express                 = require('express'),
    app                     = express(),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    bp                      = require('body-parser'),
    User                    = require('./models/user'),
    LocalStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/auth_demo', {useMongoClient: true});

app.use(require('express-session')({
    secret: "Some really long random top secret string that would never go in version control...",
    resave: false,
    saveUninitialized: false
}));

app.use(bp.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/secret', function(req, res) {
    res.render('secret');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/secret');
            });
        }
    });
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function(req, res) {
});

app.listen(8080, '127.0.0.1', function() {
    console.log('Server listening...');
});
