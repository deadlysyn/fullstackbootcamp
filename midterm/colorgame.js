
// 3 easy, 6 hard
var boardSize = 6;
// list of colors for game pieces
var colors = [];
// save random color that needs guessed
var randColor;
// menubar items
var btnNew document.getElementById("new");
var btnEasy document.getElementById("easy");
var btnHard document.getElementById("hard");
var message document.getElementById("mid");

// generate a random int between min and max
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // max and min inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// populate colors array with random rgbs
function mkColors() {
    var r, g, b;
    for (i=0; i < boardSize; i++) {
        r = randInt(0, 255);
        g = randInt(0, 255);
        b = randInt(0, 255);
        colors[i] = String("rgb(" + r + ", " + g + ", " + b + ")");
    }
}

// TODO
function checkGuess() {
    console.log("hello" + this.style.backgroundColor);
}

// all setup required to start a new game
function startGame() {
    mkColors();
    randColor = colors[randInt(0, colors.length - 1)];
    document.getElementById("randColor").textContent = randColor;

    var pieces = document.querySelectorAll(".piece");
    for (i=0; i < pieces.length; i++) {
        pieces[i].style.backgroundColor = colors[i];
        pieces[i].addEventListener("click", checkGuess);
    }
}

// menubar functions

startGame();
