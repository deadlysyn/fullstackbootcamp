/*
 * fun with express
 */

var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hello World!");
    console.log("requested /");
});

app.get("/bye", function(req, res) {
    res.send("Buh-Bye!");
    console.log("requested /bye");
});

app.get("/dog/:name", function(req, res) {
    res.send("You have a dog named " + req.params.name);
    console.log("requested /dog");
});

// catch-all route; needs to come last
app.get("*", function(req, res) {
    res.send("Hmm, please try again...");
});

app.listen(8080, "127.0.0.1", function() {
    console.log("Server has started...");
});
