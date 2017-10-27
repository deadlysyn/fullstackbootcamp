
console.log("return true if x is even; else false");

function isEven(x) {
    if (x % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

console.log("4: " + isEven(4));
console.log("21: " + isEven(21));
console.log("68: " + isEven(68));
console.log("333: " + isEven(333));

console.log("return factorial of x");

function factorial(x) {
    var f = 1;
    if (x == 0 || x == 1) {
        return 1;
    }
    for (i=1; i <= x; i++) {
        f *= i;
    }
    return f;
}

console.log("5: " + factorial(5));
console.log("2: " + factorial(2));
console.log("10: " + factorial(10));
console.log("0: " + factorial(0));

console.log("kebab to snake case");

function kebabToSnake(s) {
    return s.replace(/-/g, "_");
}

console.log("hi-there: " + kebabToSnake("hi-there"));
console.log("dogs-are-awesome: " + kebabToSnake("dogs-are-awesome"));
