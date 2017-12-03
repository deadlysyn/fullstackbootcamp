// bonus: match on any string that contains "yes"
var answer = prompt("are we there yet?");
var substring = "yes";
while (answer.indexOf(substring) === -1) {
    answer = prompt("are we there yet?");
}
alert("yay we made it!");
