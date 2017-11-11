// NOTE: use 'on' vs 'click' to ensure listeners are added
// to future items that get added to page. note trick of
// selecting ul then targeting the li within the call to 'on'.

// toggle todos
$("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
});

// delete todos
$("ul").on("click", "span", function(event) {
    // stop click from bubbling up to outer elements
    event.stopPropagation();
    // remove li of span we clicked
    $(this).parent().fadeOut(function() {
        $(this).remove();
    });
});

// add todos
$("input").keypress(function(event) {
    if (event.which == 13) {
        var todoText = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> " + todoText + "</li>");
    }
});

// toggle todo input
$(".fa-plus").click(function(){
    $("input").fadeToggle();
});
