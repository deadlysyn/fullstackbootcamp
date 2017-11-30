/*
 * using POST routes and forms in express
 */

var express = require('express');
var app = express();

var bp = require('body-parser');
app.use(bp.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var friends = ['Tom', 'Dick', 'Harriette'];

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/friends', function(req, res) {
    res.render('friends', {friends: friends});
});

app.post('/addfriend', function(req, res) {
    friends.push(req.body.newFriend);
    res.redirect('/friends');
});

app.listen(8080, '127.0.0.1', function() {
    console.log('Server listening...');
});
