//================
// Campgrounds Routes
//================

var express = require("express"),
    router  =    express.Router(),
    Campground = require("../models/campground");


//INDEX - show all campgrounds
router.get("/campgrounds", function(req,res){
    //res.render("campgrounds", {campgrounds:campgrounds});
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//CREATE 
router.post("/campgrounds", isLoggenIn ,function(req,res){
   // get data from form and add
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
      var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name:name, image: image, description:desc, author: author};
   //create a new camp and save it
   Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);  
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create a new campground
router.get("/campgrounds/new", isLoggenIn ,function(req, res) {
   res.render("campgrounds/new"); 
});

//SHOW - Shows more info
router.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTES
router.get("/campgrounds/:id/edit", checkCampgroundOwnership ,function(req, res) {
        Campground.findById(req.params.id, function(foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});

//Update route
router.put("/campgrounds/:id", checkCampgroundOwnership ,function(req, res){
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }      
   });
   //redirect somewhere
});

//Destroy Campground route
router.delete("/campgrounds/:id", checkCampgroundOwnership ,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
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

function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                res.redirect("back");
            } else {
                //does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)) {
                    next(); 
                } else {
                    res.redircet("back");
                }
            }
        });
    } else {
        res.redircet("back");
    }
}

module.exports = router;