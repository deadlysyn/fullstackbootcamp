/*
 * using ejs templates
 */

var express = require('express');
var app = express();

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/love/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love.ejs", {thing: thing});
});

app.listen(8080, "127.0.0.1", function() {
    console.log("Server started...");
});
