// pass in array
function printReverse(a) {
    for (i=a.length; i >= 0; i--) {
        console.log(a[i]);
    }
}
printReverse([1,2,3,4]);
printReverse(["a","b","c"]);

// pass in array
// true if all items are the same
function isUniform(a) {
    var r = true;
    for (i=0; i <= a.length-2; i++) {
        if (a[i] != a[i+1]) {
            return false;
        }
    };
    return r
}
console.log(isUniform([1,1,1,1]));
console.log(isUniform([2,1,1,1]));
console.log(isUniform(["a", "b", "p"]));
console.log(isUniform(["b", "b", "b"]));

function sumArray(a) {
    var t = 0;
    a.forEach(function(item){
        t += item;
    });
    console.log(t);
}
sumArray([1,2,3]);
sumArray([10,3,10,4]);
sumArray([-5,100]);
