/*
 * making HTTP requests for fun and profit
 */

var request = require('request');

request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (err, res, body) {
    if (err) {
        console.log("Something went wrong:");
        console.log(err);
    } else if (res.statusCode == 200) {
        // body is a string...
        //console.log(typeof body);
        // so convert it to an object...
        var json = JSON.parse(body);
        var time = json.query.results.channel.astronomy.sunset;
        console.log("The sun will set in Hawaii at " + time + '.');
    }
});
