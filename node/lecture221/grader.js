/*
 * simple function to take array of grades and compute
 * rounded average for class.
 */

function grader(scores) {
    if (scores.length > 0) {
        var total = 0;
        for (var i = 0; i < scores.length; i++) {
            total += scores[i];
        }
        return Math.round(total / scores.length);
    } else {
        console.log("did you provide any grades?");
        return 0;
    }
}

// should return 94
var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(grader(scores));

// should return 68
var scores = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(grader(scores));

// should return 0 and print a message
var scores = [];
console.log(grader(scores));
