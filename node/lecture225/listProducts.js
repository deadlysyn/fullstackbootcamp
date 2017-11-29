/*
 * experiment using 3rd party node.js libraries:
 *
 * use "faker" to generate a list of random product
 * names and prices.
 */

var faker = require("faker");

function fakeCatalog(size) {
    if (!size) {
        console.log("no size specified; using default");
        var size = 3;
    }

    for (var i = 0; i < size; i++) {
        console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
    }
}

console.log("--------------------");
console.log("FakityFakeFake Shop!");
console.log("--------------------");
fakeCatalog(10);
