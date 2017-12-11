/*
 * index and auth routes
 */

var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    User        = require('../models/user');

router.get('/', function(req, res) {
    res.render('landing');
});

// show registration form
router.get('/register', function(req, res) {
    res.render('register');
});

// register new user
router.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/campgrounds');
            });
        }
    });
});

// show login form
router.get('/login', function(req, res) {
    res.render('login');
});

// login user
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res) {
});

// logout user
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds');
});

// middleware to check if user has logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
