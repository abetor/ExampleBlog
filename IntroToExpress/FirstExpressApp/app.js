var express = require("express");
var app = express();

// "/" => "Hi there"
app.get("/", function(req,res){
    res.send("Hi there");
});


// "/bye" => "Gooodbye!"
app.get("/bye", function(req,res){
   res.send("Goodbye!!"); 
});

app.get("/dog", function(req, res) {
    console.log("SOMEONE MADE A REQUEST TO /DOG");
    res.send("MEOW");
});

app.get("/r/:subredditName", function(req, res) {
    res.send("welcome to a subreddit!"); 
});

app.get("/r/:subredditName/comments/:id/:title/",function(req, res) {
    res.send("Welcome to a the comments page");
})

app.get("*",function(req, res) {
    res.send("you are a star!!!");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});

