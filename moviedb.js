
var movies = [
    { name: "Frozen", rating: "4 stars", watched: true },
    { name: "Mad Max", rating: "5 stars", watched: true },
    { name: "Les Miserables", rating: "3.5 stars", watched: false }
];

function listMovies(a) {
    for (i=0; i < a.length; i++) {
        var prefix = "You have not seen"
        if (a[i].watched == true) {
            prefix = "You have watched"
        }
        console.log(prefix + " " + "\"" + a[i].name + "\" - " + a[i].rating);
    }
}

listMovies(movies);
