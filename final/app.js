/*
 * Final project: YelpCamp (Yelp clone for campgrounds)
 *
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
    image: String
});
// model
var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: campgrounds});
        }
    });
});

app.post('/campgrounds', function(req, res) {
    Campground.create({
        name: req.body.name,
        image: req.body.image
    }, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

app.listen(port, '127.0.0.1', function() {
    console.log('Server listening...');
});
