/*
 * campground routes
 */

var express     = require('express'),
    router      = express.Router(),
    Campground  = require('../models/campground'),
    middleware  = require('../middleware');

// show all campgrounds
router.get('/', function(req, res) {
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

// add new campground
router.post('/', middleware.isLoggedIn, function(req, res) {
    Campground.create({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, function(err, campground) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully created campground!');
            res.redirect('/campgrounds');
        }
    });
});

// show form to create campground
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// show info about specific campground
router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, campground) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            res.render('campgrounds/show', {campground: campground});
        }
    });
});

// show form to edit campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            res.render('campgrounds/edit', {campground: campground});
        }
    });
});

// update campground
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully updated campground!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// remove campground
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong, please try again...');
            res.redirect('back');
        } else  {
            req.flash('success', 'Successfully deleted campground!');
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;
