/*
 * Exercise MongoDB by creating a simple blog.
 */

var express     = require('express'),
    app         = express(),
    port        = parseInt(process.env.PORT, 10) || 8080,
    bp          = require('body-parser'),
    mongoose    = require('mongoose');

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/miniblog', {useMongoClient: true});
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);

app.get('/', function(req, res) {
    res.redirect('/blogs');
});

// index
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

// new form
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

// create post
app.post('/blogs', function(req, res) {
    Blog.create(req.body.blog, function(err, blog) {
        if (err) {
            res.redirect('/blogs/new');
        } else {
            res.redirect('/blogs');
        }
    });
});

// show post
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, post) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {post: post});
        }
    });
});

// edit post
app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: blog});
        }
    });
});

app.listen(port, '127.0.0.1', function() {
    console.log('Server listening...');
});
