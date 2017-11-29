
/*
button = document.querySelector("button");
body = document.querySelector("body");
var isPurple = false;
button.addEventListener("click", function() {
    if (!isPurple) {
        body.style.background = ("purple");
    } else {
        body.style.background = ("white");
    }
    isPurple = !isPurple;
    console.log("purple == " + isPurple);
});
*/

// shorter way...use toggle to (un)apply CSS class
button = document.querySelector("button");
button.addEventListener("click", function() {
    document.body.classList.toggle("purple");
});
