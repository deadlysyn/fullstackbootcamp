/*
 * comment routes
 */

var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    Campground  = require('../models/campground'),
    Comment     = require('../models/comment');
    middleware  = require('../middleware');

// show form to create comment
router.get('/new', middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// add new comment
router.post('/', middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Something went wrong, please try again...');
                    res.redirect('back');
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'Successfully created comment!');
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// show form to edit comment
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: comment});
        }
    });
});

// update comment
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully updated comment!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// remove comment
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully deleted comment!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

module.exports = router;
