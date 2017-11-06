
// size of board
var size = 6;
// list of colors for game pieces
var colors = [];
// random color that needs guessed
var randColor;

// game pieces
var pieces = document.querySelectorAll(".piece");
// menubar items
var btnNew = document.getElementById("new");
var btnEasy = document.getElementById("easy");
var btnHard = document.getElementById("hard");
var msg = document.getElementById("msg");

// simulated sleep courtesy of stack overflow
function sleep(ms) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > ms){
      break;
    }
  }
}

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
    for (i=0; i < colors.length; i++) {
        colors[i] = "#333333";
    }
    for (i=0; i < size; i++) {
        r = randInt(0, 255);
        g = randInt(0, 255);
        b = randInt(0, 255);
        colors[i] = String("rgb(" + r + ", " + g + ", " + b + ")");
    }
}

function checkGuess() {
    console.log("guess: " + this.style.backgroundColor);

    if (this.style.backgroundColor == randColor) {
        msg.textContent = "You Win!";
        document.getElementById("top").style.backgroundColor = randColor;
        for (i=0; i< pieces.length; i++) {
            pieces[i].style.backgroundColor = randColor;
        }
    } else {
        msg.textContent = "Try Again";
        this.style.backgroundColor = "#333333";
    }
}

// all setup required to start a new game
function startGame() {
    // generate colors for all game pieces
    mkColors(size);
    // color of random piece to guess
    randColor = colors[randInt(0, size - 1)];

    document.getElementById("randColor").textContent = randColor;
    document.getElementById("top").style.backgroundColor = "#60aadd";
    msg.textContent = "Click colors to guess...";

    for (i=0; i < pieces.length; i++) {
        pieces[i].style.backgroundColor = colors[i];
        pieces[i].addEventListener("click", checkGuess);
    }
}

function hover() {
    this.classList.toggle("hover");
}

// main

btnNew.addEventListener("mouseover", hover);
btnNew.addEventListener("mouseout", hover);
btnNew.addEventListener("click", startGame);

btnEasy.addEventListener("mouseover", hover);
btnEasy.addEventListener("mouseout", hover);
btnEasy.addEventListener("click", function() {
    size = 3;
    startGame();
});

btnHard.addEventListener("mouseover", hover);
btnHard.addEventListener("mouseout", hover);
btnHard.addEventListener("click", function() {
    size = 6;
    startGame();
});

startGame();
