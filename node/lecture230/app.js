/*
 * moar route practice with express
 */

var express = require("express");
app = express();

app.get("/", function(req, res) {
    res.send("Hello, welcome to my oh-so-awesome assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal;
    if (animal == "pig") {
        res.send("The pig says OINK!");
    } else if (animal == "cow") {
        res.send("The cow says MOOO!");
    } else if (animal == "dog") {
        res.send("The dog says WOOF!");
    } else {
        res.send("I'm not sure what a " + animal + " says!?!");
    }
});

app.get("/repeat/:string/:number", function(req, res) {
    var number = req.params.number;
    if (number < 1) {
        res.send('"number" should be a positive integer');
    } else {
        var string = req.params.string;
        for (var i = 1; i < number; i++) {
            string += " " + req.params.string;
        }
        res.send(string);
    }

});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...");
});

app.listen(8080, "127.0.0.1", function() {
    console.log("Started server...");
});
