var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment"),
    Campground  = require("./models/campground");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", function(req,res){
   res.render("landing"); 
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
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
app.post("/campgrounds", function(req,res){
   // get data from form and add
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name:name, image: image, description:desc};
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
app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new"); 
});

//SHOW - Shows more info
app.get("/campgrounds/:id", function(req, res) {
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

//=======================

app.get("/campgrounds/:id/comments/new", function(req,res){
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

app.post("/campgrounds/:id/comments", function(req, res){
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
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server Has Started!"); 
});