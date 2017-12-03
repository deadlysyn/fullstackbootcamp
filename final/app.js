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
        {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Granite Hill", image: "https://farm8.staticflickr.com/7527/15944090146_cc72295efc.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1268/4671261338_a0e9f5e219.jpg"}
    ];

    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(port, '127.0.0.1', function() {
    console.log('Server listening...');
});
