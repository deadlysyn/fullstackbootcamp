/*
 * middleware
 */

var Campground      = require('../models/campground'),
    Comment         = require('../models/comment'),
    middleware      = {};

// check if user has logged in
middleware.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that...');
    res.redirect('/login');
}

// check campground ownership
middleware.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground) {
            if (err) {
                req.flash('error', 'Something went wrong, please try again...');
                res.redirect('back');
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You don't have permission to do that.");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that...');
        res.redirect('back');
    }
}

// check comment ownership
middleware.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                req.flash('error', 'Something went wrong, please try again...');
                res.redirect('back');
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You don't have permission to do that.");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that...');
        res.redirect('back');
    }
}

module.exports = middleware;
