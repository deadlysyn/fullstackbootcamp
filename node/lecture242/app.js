/*
 * API exercise: talk to omdbapi.com
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
    res.render('home');
});

// http://omdbapi.com/?apikey=thewdb&s=<name>
// http://omdbapi.com/?apikey=thewdb&i=<id>
app.post('/search', function(req, res) {
    var search = req.body.search;
    var url = 'http://omdbapi.com/?apikey=thewdb&s=' + search;

    request(url, function (err, resp, body) {
        if (err) {
            console.log("ERROR: something went wrong, dumping payload...");
            console.log(err);
        } else if (resp.statusCode == 200) {
            res.render('results', {results: JSON.parse(body).Search});
        }
    });

});

app.listen(port, '127.0.0.1', function(req, res) {
    console.log('Server started...');
});
