var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name:"Salmon Creek", 
//         image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSdtLU5yYTVqE9YQbj05CsyJrV3TbMKkSCMplsFMq8dZlyjCr8i",
//         description: "DFd2 JDfoj dJJDks KDfksj JFDSj"
//     }, 
//         function(err, campground){
//             if(err) {
//                 console.log(err);
//             } else {
//                 console.log("NEWLY CREATED CAMPGROUND");
//                 console.log(campground);
//             }
//     });

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
            res.render("index", {campgrounds:allCampgrounds});
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
   res.render("new"); 
});

//SHOW - Shows more info
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
    req.params.id
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server Has Started!"); 
});