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

app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

app.listen(port, '127.0.0.1', function() {
    console.log('Server listening...');
});
