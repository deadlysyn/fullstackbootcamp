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
            req.flash('error', err.name + ': ' + err.message + '.');
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function() {
                req.flash('success', 'Welcome to Yelpcamp ' + user.username);
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
    req.flash('success', 'Successfully logged out.');
    res.redirect('/campgrounds');
});

module.exports = router;
