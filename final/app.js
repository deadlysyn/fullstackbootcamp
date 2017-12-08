/*
 * Final project: YelpCamp (Yelp clone for campgrounds)
 * Routes are first-match, so order matters.
 */

var express     = require('express'),
    app         = express(),
    port        = parseInt(process.env.PORT, 10) || 8080,
    request     = require('request'),
    bp          = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground');

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('landing');
});

// INDEX - show all campgrounds
app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: campgrounds});
        }
    });
});


// CREATE - add new campground
app.post('/campgrounds', function(req, res) {
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

// NEW - show form to create campground
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

// SHOW - show info about specific campground
app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('show', {campground: campground});
        }
    });
});

app.listen(port, '127.0.0.1', function() {
    console.log('Server listening...');
});
