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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate in felis quis porta. Nam vestibulum ex ornare, molestie lectus vel, pellentesque erat. Mauris auctor auctor neque non ultricies. Proin non mi tempor lectus sagittis egestas quis ac mauris. Sed ultricies, lacus ac egestas vestibulum, justo urna tempor elit, at sollicitudin mauris arcu vel tellus. Vivamus pulvinar risus ac pulvinar mattis. Maecenas gravida volutpat odio quis porttitor. Nullam quis augue eleifend, porta purus a, imperdiet mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse rutrum ipsum in lectus dapibus porta. In sit amet purus sit amet felis sollicitudin posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc gravida luctus enim, vitae tempor ante hendrerit vitae. Integer hendrerit erat blandit felis sollicitudin elementum. Cras congue sagittis ante. "
    },
    {
        name: "Treeless Bluff",
        image: "https://farm9.staticflickr.com/8302/7820598746_4d8c11899e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate in felis quis porta. Nam vestibulum ex ornare, molestie lectus vel, pellentesque erat. Mauris auctor auctor neque non ultricies. Proin non mi tempor lectus sagittis egestas quis ac mauris. Sed ultricies, lacus ac egestas vestibulum, justo urna tempor elit, at sollicitudin mauris arcu vel tellus. Vivamus pulvinar risus ac pulvinar mattis. Maecenas gravida volutpat odio quis porttitor. Nullam quis augue eleifend, porta purus a, imperdiet mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse rutrum ipsum in lectus dapibus porta. In sit amet purus sit amet felis sollicitudin posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc gravida luctus enim, vitae tempor ante hendrerit vitae. Integer hendrerit erat blandit felis sollicitudin elementum. Cras congue sagittis ante. "
    },
    {
        name: "Green Forest",
        image: "https://farm4.staticflickr.com/3164/2645148513_1a1824659c.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate in felis quis porta. Nam vestibulum ex ornare, molestie lectus vel, pellentesque erat. Mauris auctor auctor neque non ultricies. Proin non mi tempor lectus sagittis egestas quis ac mauris. Sed ultricies, lacus ac egestas vestibulum, justo urna tempor elit, at sollicitudin mauris arcu vel tellus. Vivamus pulvinar risus ac pulvinar mattis. Maecenas gravida volutpat odio quis porttitor. Nullam quis augue eleifend, porta purus a, imperdiet mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse rutrum ipsum in lectus dapibus porta. In sit amet purus sit amet felis sollicitudin posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc gravida luctus enim, vitae tempor ante hendrerit vitae. Integer hendrerit erat blandit felis sollicitudin elementum. Cras congue sagittis ante. "
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
