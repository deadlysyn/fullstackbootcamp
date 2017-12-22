/*
 * Final project: YelpCamp (Yelp clone for campgrounds)
 */

var express         = require('express'),
    app             = express(),
    request         = require('request'),
    bp              = require('body-parser'),
    mongoose        = require('mongoose'),
    flash           = require('connect-flash'),
    passport        = require('passport'),
    methodOverride  = require('method-override'),
    LocalStrategy   = require('passport-local'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment'),
    User            = require('./models/user');

// import route handlers
var indexRoutes         = require('./routes/index'),
    campgroundRoutes    = require('./routes/campgrounds'),
    commentRoutes       = require('./routes/comments');

// environment config
var ip              = process.env.IP || '127.0.0.1',
    port            = parseInt(process.env.PORT, 10) || 8080,
    dbURL           = process.env.DBURL || 'mongodb://localhost/yelp_camp',
    passportSecret  = process.env.SECRET || "Some random long string you'd never put in version control.";

console.log(' DBURL: ' + dbURL);
console.log('SECRET: ' + passportSecret.substring(0,10) + '...');

mongoose.connect(dbURL, {useMongoClient: true});

// uncomment to drop and re-populate DB with test data on each run
//var seedDB = require('./seeds');
//seedDB();

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// flash messages; must come before passport config
app.use(flash());

// passport configuration
app.use(require('express-session')({
    secret: passportSecret,
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
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(port, ip, function() {
    console.log('Server listening on ' + ip + ':' + port + '...');
});
