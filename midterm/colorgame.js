
// size of board
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
    console.log("guess: " + this.style.backgroundColor);

    if (this.style.backgroundColor == randColor) {
        msg.textContent = "You Win!";
        btnNew.textContent = "PLAY AGAIN?";
        document.getElementById("top").style.backgroundColor = randColor;
        for (i=0; i< boardSize; i++) {
            pieces[i].style.backgroundColor = randColor;
        }
    } else {
        msg.textContent = "Try Again";
        this.style.backgroundColor = boardColor;
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
        document.getElementById("hard").classList.add("selected");
        document.getElementById("easy").classList.remove("selected");
    } else {
        document.getElementById("easy").classList.add("selected");
        document.getElementById("hard").classList.remove("selected");
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

function hover() {
    if (!this.classList.contains("selected")) {
        this.classList.toggle("hover");
    }
}

// main

btnNew.addEventListener("mouseover", hover);
btnNew.addEventListener("mouseout", hover);
btnNew.addEventListener("click", startGame);

btnEasy.addEventListener("mouseover", hover);
btnEasy.addEventListener("mouseout", hover);
btnEasy.addEventListener("click", function() {
    boardSize = 3;
    startGame();
});

btnHard.addEventListener("mouseover", hover);
btnHard.addEventListener("mouseout", hover);
btnHard.addEventListener("click", function() {
    boardSize = 6;
    startGame();
});

// reads global boardSize so state is maintained
// when asking for new colors...
startGame();

// TODO
// bug: hard-easy-hard keeps easy "selected"
// bug: click listener still attached to unused pieces in easy
