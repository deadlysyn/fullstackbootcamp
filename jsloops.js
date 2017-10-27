// WHILE LOOPS

/*
// print nums between -10 and 19
var num = -10;
while (num <= 19) {
    console.log(num);
    num++;
}

// print even nums between 10 and 40
var num = 10;
while (num <= 40) {
    console.log(num);
    num+=2;
}

// print odd nums between 300 and 333
var num = 300;
while (num <= 333) {
    if (num % 2 != 0) {
        console.log(num);
    }
    num++;
}

// print nums divisible by 5 and 3 between 5 and 50
var num = 5;
while (num <= 50) {
    if ((num % 5 == 0) && (num % 3 == 0)) {
        console.log(num);
    }
    num++;
}
*/

// FOR LOOPS

console.log("nums between -10 and 19...")
for (var i = -10; i <= 19; i++) {
    console.log(i)
}

console.log("evens between 10 and 40...")
for (var i = 10; i <= 40; i += 2) {

    console.log(i)
}

console.log("odds between 300 and 333...")
for (var i = 300; i <= 333; i++) {
    if (i % 2 != 0) {
        console.log(i);
    }
}

console.log("nums divisible by 5 and 3 between 5 and 50...")
for (var i = 5; i <= 50; i++) {
    if (i % 5 == 0 && i % 3 == 0) {
        console.log(i);
    }
}
