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
    methodOverride  = require('method-override'),
    LocalStrategy   = require('passport-local'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedDB          = require('./seeds');

var indexRoutes         = require('./routes/index'),
    campgroundRoutes    = require('./routes/campgrounds'),
    commentRoutes       = require('./routes/comments');

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
//seedDB();

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

// make user object available in all views/templates
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(port, '127.0.0.1', function() {
    console.log('Server listening...');
});
