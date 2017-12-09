/*
 * Final project: YelpCamp (Yelp clone for campgrounds)
 */

var express         = require('express'),
    app             = express(),
    port            = parseInt(process.env.PORT, 10) || 8080,
    request         = require('request'),
    bp              = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedDB          = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
seedDB();

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// passport configuration
app.use(require('express-session')({
    secret: "Some random long string you'd never put in version control.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
 * NOTE: Routes are first-match, order matters!
 */

app.get('/', function(req, res) {
    res.render('landing');
});

// INDEX - show all campgrounds
app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
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
    res.render('campgrounds/new');
});

// SHOW - show info about specific campground
app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campground: campground});
        }
    });
});

// NEW - show form to create comment
app.get('/campgrounds/:id/comments/new', function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// CREATE - add new comment
app.post('/campgrounds/:id/comments', function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// AUTH ROUTES

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
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

app.listen(port, '127.0.0.1', function() {
    console.log('Server listening...');
});
