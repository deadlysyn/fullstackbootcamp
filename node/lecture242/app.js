/*
 * API exercise: talk to omdbapi.com
 */

var express = require('express'),
    request = require('request'),
    bp = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));

app.get('/', function(req, res) {
    request('http://omdbapi.com/?apikey=thewdb&s=star', function (err, resp, body) {
    if (err) {
        console.log("Something went wrong:");
        console.log(err);
    } else if (resp.statusCode == 200) {
        res.render('home', {results: JSON.parse(body).Search});
    }
});

});

// http://omdbapi.com/?apikey=thewdb&s=<name>
// http://omdbapi.com/?apikey=thewdb&i=<id>
app.post('/findmovie', function(req, res) {
});

app.listen(8080, '127.0.0.1', function(req, res) {
    console.log('Server started...');
});
