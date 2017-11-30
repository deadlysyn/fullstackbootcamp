/*
 * using ejs templates
 */

var express = require('express');
var app = express();

// serve static content from public directory
app.use(express.static("public"));
// don't have to specify ".ejs" in template filenames
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/love/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love", {thing: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "ZOMG", author: "Tom"},
        {title: "Please tell me that's not your dog!", author: "Dick"},
        {title: "Code smells", author: "Hariette"}
    ];

    res.render("posts", {posts: posts});
});

app.listen(8080, "127.0.0.1", function() {
    console.log("Server started...");
});
