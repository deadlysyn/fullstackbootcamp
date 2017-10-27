
var age = prompt("What is your age?");

// account for leap years
days = age * 365.25;
secs = days * 24 * 60 * 60;

//alert("Nice to meet you, " + first + " " + last);
alert("You are " + days + " days old. (That's " + secs + " seconds!)");
