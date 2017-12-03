/*
 * Final project: YelpCamp (Yelp clone for campgrounds)
 *
 */

var express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 8080,
    request = require('request'),
    bp = require('body-parser');

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    var campgrounds = [
        {name: 'Foo', image: 'http://something.com/foo'},
        {name: 'Bar', image: 'http://something.com/bar'},
        {name: 'Baz', image: 'http://something.com/baz'}
    ];

    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(port, '127.0.0.1', function() {
    console.log('Server listening...');
});
