/*
 * API exercise: talk to omdbapi.com
 *
 * TODO: try and master the art of callbacks to get more
 * information in the rendered response.
 *
 */

var express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 8080,
    request = require('request'),
    bp = require('body-parser');

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));

function get(url, callback) {
    console.log("INFO: fetching " + url);
    request(url, function (err, res, body) {
        if (err) {
            console.log("ERROR: something went wrong, dumping payload...");
            console.log(err);
        } else if (res.statusCode == 200) {
            callback(JSON.parse(body));
        }
    });
}

// http://omdbapi.com/?apikey=thewdb&s=<name>
// http://omdbapi.com/?apikey=thewdb&i=<id>
function findMovies(search, callback) {
    var searchURL = 'http://omdbapi.com/?apikey=thewdb&s=';
    var imdbURL = 'http://omdbapi.com/?apikey=thewdb&i=';
    var results = [];

    // TODO: working, but not sure if it's "right" or just
    // "callback hell"...
    get(searchURL + search, function(searchBody) {
        searchBody.Search.forEach(function(movie) {
            get(imdbURL + movie.imdbID, function(imdbBody) {
                results.push({
                    title: movie.Title,
                    year: movie.Year,
                    genre: imdbBody.Genre,
                    rating: imdbBody.imdbRating
                });
            });
        });
    });
    // TODO: results will still be empty since the inner gets
    // are still running...
    //console.log(results);
    callback(results);
}

app.get('/', function(req, res) {
    res.render('home');
});

app.post('/search', function(req, res) {
    var search = req.body.search;
    // TODO: tried rewriting this, get and findMovies a few ways
    // but mostly just move the problem around...  results is
    // empty even though we're waiting for it in a callback.
    findMovies(search, function(results) {
        res.render('results', {results: results});
    });
});

app.listen(port, '127.0.0.1', function(req, res) {
    console.log('Server started...');
});
