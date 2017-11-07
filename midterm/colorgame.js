// TODO: if rand color == white invert banner text color
// TODO: if rand color == board color add border

var boardSize = 6;
var boardColor = "#333333";
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
    // reset any existing colors
    for (i=0; i < colors.length; i++) {
        colors[i] = boardColor;
    }
    for (i=0; i < boardSize; i++) {
        var r = randInt(0, 255);
        var g = randInt(0, 255);
        var b = randInt(0, 255);
        colors[i] = String("rgb(" + r + ", " + g + ", " + b + ")");
    }
}

function checkGuess() {
    if (this.style.backgroundColor == randColor) {
        msg.textContent = "You Win!";
        btnNew.textContent = "PLAY AGAIN?";
        document.getElementById("top").style.backgroundColor = randColor;
        for (i=0; i < boardSize; i++) {
            pieces[i].style.backgroundColor = randColor;
            pieces[i].removeEventListener("click", checkGuess);
        }
    } else {
        msg.textContent = "Try Again";
        this.style.backgroundColor = boardColor;
        // TODO: try refactoring to use display instead...
        //this.style.display = "none";
    }
}

// all setup required to start a new game
function startGame() {
    // generate colors for all game pieces
    mkColors(boardSize);
    // color of random piece to guess
    randColor = colors[randInt(0, boardSize - 1)];

    document.getElementById("randColor").textContent = randColor.toUpperCase();
    document.getElementById("top").style.backgroundColor = "#60aadd";
    msg.textContent = "Click colors to guess...";
    btnNew.textContent = "NEW COLORS";

    if (boardSize == 6) {
        btnHard.classList.add("selected");
        btnEasy.classList.remove("selected");
    } else {
        btnEasy.classList.add("selected");
        btnHard.classList.remove("selected");
    }

    for (i=0; i < pieces.length ; i++) {
        pieces[i].style.backgroundColor = colors[i];
        if (i < boardSize) {
            pieces[i].addEventListener("click", checkGuess);
        } else {
            pieces[i].removeEventListener("click", checkGuess);
        }
    }
}

// main

btnNew.addEventListener("click", startGame);
btnEasy.addEventListener("click", function() {
    boardSize = 3;
    startGame();
});
btnHard.addEventListener("click", function() {
    boardSize = 6;
    startGame();
});

// reads global boardSize so state is maintained
// when asking for new colors...
startGame();
