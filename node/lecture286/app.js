var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/auth_demo', {useMongoClient: true});
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/secret', function(req, res) {
    res.render('secret');
});

app.listen(8080, '127.0.0.1', function() {
    console.log('Server listening...');
});
