// select all the elements we need to manipulate...
var buttonOne = document.getElementById("one");
var buttonTwo = document.getElementById("two");
var buttonReset = document.getElementById("reset");
var oneH1 = document.getElementById("oneh1");
var twoH1 = document.getElementById("twoh1");
var total = document.getElementById("total");
var input = document.getElementById("score");
var playTo = Number(total.textContent);

input.addEventListener("change", function() {
    playTo = Number(input.value);
    total.textContent = input.value;
    reset();
});

buttonOne.addEventListener("click", function() {
    if (oneH1.textContent < playTo && twoH1.textContent < playTo) {
        oneH1.textContent = Number(oneH1.textContent) + 1;
        if (oneH1.textContent == playTo) {
            // works but less good
            //oneH1.style.color = "green";
            // not working ?
            oneH1.classList.add("green");
        }
    }
});

buttonTwo.addEventListener("click", function() {
    if (oneH1.textContent < playTo && twoH1.textContent < playTo) {
        twoH1.textContent = Number(twoH1.textContent) + 1;
        if (twoH1.textContent == playTo) {
            twoH1.style.color = "green";
        }
    }
});

buttonReset.addEventListener("click", function() {
    reset();
});

function reset() {
    oneH1.textContent = "0";
    // not working ?
    oneH1.classList.remove("green");
    //oneH1.style.color = "black";
    twoH1.textContent = "0";
    //twoH1.classList.toggle("green");
    twoH1.style.color = "black";
}
