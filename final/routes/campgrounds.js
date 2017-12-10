/*
 * campground routes
 */

var express     = require('express'),
    router      = express.Router(),
    Campground  = require('../models/campground');

// show all campgrounds
router.get('/', function(req, res) {
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

// add new campground
router.post('/', function(req, res) {
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// show form to create campground
router.get('/new', function(req, res) {
    res.render('campgrounds/new');
});


// SHOW - show info about specific campground
router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campground: campground});
        }
    });
});

module.exports = router;
