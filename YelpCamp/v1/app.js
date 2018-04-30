var express = require("express");
var app = express();
var bodyParser = require("body-parser");

    var campgrounds = [
        {name:"Salmon Creek", image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSdtLU5yYTVqE9YQbj05CsyJrV3TbMKkSCMplsFMq8dZlyjCr8i"},
        {name:"Granite Hill", image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSRMo_fjCm020KQ_TPDC9My45IriEgg1vi0MmyL9f8702UEAm3hLA"},
        {name:"Mountain Goat's Rest", image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS43t33EVgKhbfj00-7raJYBsEidMXd0veVeFS1CqSiH32VIsS6"}
        ]  

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){

    
    res.render("campgrounds", {campgrounds:campgrounds});    
});

app.post("/campgrounds", function(req,res){
   // get data from form and add
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name:name, image: image};
   campgrounds.push(newCampground);
   // redirect back
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server Has Started!"); 
});