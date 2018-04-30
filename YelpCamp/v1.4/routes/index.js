var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

//Root route
router.get("/", function(req,res){
   res.render("landing"); 
});

// ===========
// AUTH ROUTES
//============

//Show register form
router.get("/register", function(req, res){
   res.render("register"); 
});
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//Show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//Handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

//Middleware
function isLoggenIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;