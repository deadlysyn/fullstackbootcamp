/*
 * fun with express
 */

var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hello World!");
    console.log(req);
});

app.get("/bye", function(req, res) {
    res.send("Buh-Bye!");
});

app.get("/dog", function(req, res) {
    res.send("How Cute!");
});

app.listen(8080, "127.0.0.1", function() {
    console.log("Server has started...");
});
