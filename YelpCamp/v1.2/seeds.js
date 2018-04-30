var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloude Rest",
            image: "http://www.skylinedriveoverlooks.com/wp-content/uploads/2015/07/skyline-drive-campgrounds-2.jpg",
            description: "At vero eos et accusamus et iusto odio dignissimos ducimus aepe eveniet ut et voluptates."
        },
        {
            name: "Desert Mesa",
            image: "http://www.destination360.com/north-america/us/utah/salt-lake-city/images/s/camping.jpg",
            description: "At vero eos et accusamus et iusto odio dignissimos ducimus aepe eveniet ut et voluptates."
        },
        {
            name: "Canyon Floor",
            image: "http://koa.com/content/campgrounds/allentown/photos/38110_35.jpg",
            description: "At vero eos et accusamus et iusto odio dignissimos ducimus aepe eveniet ut et voluptates."
        }
    ];

function seedDB() {
    //Remove all campgrounds;
    Campground.remove({}, function(err){
        if (err) {
           console.log(err);
        }
        console.log("removed campgrounds");
        //Add a new Campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great",
                            author: "Homer"    
                        }, function(err, comment){
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
            }); 
        });
    });
}

module.exports = seedDB;