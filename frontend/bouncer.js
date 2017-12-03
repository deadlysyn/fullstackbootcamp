
var age = prompt("What is your age?");

if (age < 0) {
    console.log("negative age?!?");
} else if (age < 18) {
    console.log("you are not old enough to enter");
} else if (age == 21) {
    console.log("happy 21st bday!");
} else if (age < 21) {
    console.log("enter but don't drink!");
} else {
    console.log("inebriation awaits!");
}

if (age % 2 != 0) {
    console.log("your age is odd!");
}

l = age.length - 1;
if (age % Math.sqrt(age) == 0) {
    console.log("you are a perfect square.");
}
