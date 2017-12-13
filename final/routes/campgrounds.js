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
router.post('/', isLoggedIn, function(req, res) {
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// show form to create campground
router.get('/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// show info about specific campground
router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campground: campground});
        }
    });
});

// show form to edit campground
router.get('/:id/edit', checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', {campground: campground});
        }
    });
});

// update campground
router.put('/:id', checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// remove campground
router.delete('/:id', checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/campgrounds');
        } else  {
            res.redirect('/campgrounds');
        }
    });
});

// middleware to check if user has logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// middleware to check campground ownership
function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground) {
            if (err) {
                res.redirect('back');
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

module.exports = router;
