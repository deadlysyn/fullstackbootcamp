/*
 * wipe DB and load some sample data
 */

var     mongoose    = require('mongoose'),
        Campground  = require('./models/campground'),
        Comment     = require('./models/comment');

var data = [
    {
        name: "Frozen Field",
        image: "https://farm1.staticflickr.com/110/316612922_38fb0698f5.jpg",
        description: "Brrrr it's so coooold!"
    },
    {
        name: "Treeless Bluff",
        image: "https://farm9.staticflickr.com/8302/7820598746_4d8c11899e.jpg",
        description: "Lots of rocks, no bathrooms."
    },
    {
        name: "Green Forest",
        image: "https://farm4.staticflickr.com/3164/2645148513_1a1824659c.jpg",
        description: "Watch for poison oak, and ivy, and snakes."
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('INFO: seedDB removed campgrounds');
            // add sample campgrounds
            data.forEach(function(campground) {
                Campground.create(campground, function(err, campground) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('INFO: seedDB added campground');
                    }
                    // add comment
                    Comment.create({
                        text: "This place would be awesome if it had Internet.",
                        author: "Peter Griffin"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('INFO: seedDB added comment');
                        }
                    });
                });
            });
        }
    });
}

module.exports = seedDB;
