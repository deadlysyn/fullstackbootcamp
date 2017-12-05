/*
 * Final project: YelpCamp (Yelp clone for campgrounds)
 *
 * RESTful notes:
 * INDEX    /things             GET    List all things
 * NEW      /things/new         GET    Form to make new thing
 * CREATE   /things             POST   Add new thing (to DB), redirect
 * SHOW     /things/:id         GET    Show info about specific thing
 * EDIT     /things/:id/edit    GET    Show edit form for one thing
 * UPDATE   /things/:id         PUT    Update specific thing, redirect
 * DESTROY  /things/:id         DELETE Delete specific thing, redirect
 *
 * Routes are first-match, so order matters.
 */

var express     = require('express'),
    app         = express(),
    port        = parseInt(process.env.PORT, 10) || 8080,
    request     = require('request'),
    bp          = require('body-parser'),
    mongoose    = require('mongoose');

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
// schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
// model
var Campground = mongoose.model('Campground', campgroundSchema);

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
