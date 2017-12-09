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

function findByName(req, res, next) {
    var searchURL = 'http://omdbapi.com/?apikey=thewdb&s=' + req.body.search;

    get(searchURL, function(results) {
        req.movies = results.Search;
        next();
    });
}

function findById(req, res, next) {
    var imdbURL = 'http://omdbapi.com/?apikey=thewdb&i=';
    var count = 0;

    req.movies.forEach(function(movie) {
        get(imdbURL + movie.imdbID, function(results) {
            movie.Genre = results.Genre;
            movie.Rating = results.imdbRating;
            movie.Image = results.Poster;
            req.movies[count] = movie;
            count += 1;
            if (count == req.movies.length - 1) {
                next();
            }
        });
    });
}

app.get('/', function(req, res) {
    res.render('home');
});

app.post('/search', findByName, findById, function(req, res) {
    console.log(req.movies);
    res.render('results', {results: req.movies});
});

app.listen(port, '127.0.0.1', function(req, res) {
    console.log('Server started...');
});
