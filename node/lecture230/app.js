/*
 * moar route practice with express
 */

var express = require("express");
app = express();

app.get("/", function(req, res) {
    res.send("Hello, welcome to my oh-so-awesome assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var sounds = {
        pig: "oink oink",
        cow: "mooooooo",
        dog: "humans give me food",
        cat: "kill all the humans",
        fish: "you're crazy"
    };
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];

    if (sound == undefined) {
        res.send("I'm not sure what the " + animal + " should say?!?");
    } else {
        res.send('The ' + animal + ' says "' + sound + '."');
    }
});

app.get("/repeat/:string/:number", function(req, res) {
    var number = Number(req.params.number);

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
