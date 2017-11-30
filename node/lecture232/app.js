/*
 * using ejs templates
 */

var express = require('express');
var app = express();

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.listen(8080, "127.0.0.1", function() {
    console.log("Server started...");
});
