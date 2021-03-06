//================
// Comments Routes
//================

var express = require("express"),
    router  =    express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

//Comments new
router.get("/new", isLoggenIn ,function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

//Comments create
router.post("/", isLoggenIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    //add username and id comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//Middleware
function isLoggenIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;