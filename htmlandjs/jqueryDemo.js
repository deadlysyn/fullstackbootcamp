
// can pass in objects to css()
var style = {
    width: "200px",
    backgroundColor: "yellow",
    fontWeight: "700"
}

if (typeof jQuery != 'undefined') {
    console.log("oh yeah");
    // select/manipulate with jQuery...
    $("div").css("backgroundColor", "purple");
    //$("div.highlight").css("width", "200px");
    $("div.highlight").css(style);
    $("div#third").css("border", "1px solid orange");
    $("div#third").css("border", "2px solid orange");
    $("div:nth-of-type(1)").css("color", "pink");
} else {
    console.log("uh no jquery dude");
}
