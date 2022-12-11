
const alert=require('alert');
const express=require('express');
const bodyParser=require('body-parser');
// const ejs = require('ejs');
const mongoose = require('mongoose');
const app=express();
const timestamps = require('mongoose-timestamp');



app.use(express.static("public"));

// app.use('/images', express.static('images'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})


mongoose.set('strictQuery',true);
mongoose.connect("mongodb://localhost:27017/portfolio", { useNewUrlParser: true })
const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    message: String, 
    timestamp: String
});
userSchema.plugin(timestamps);


const User = new mongoose.model("User", userSchema);



app.post("/",function(req,res){
    
    var user = new User({username: req.body.name});
    const newUser = new User({
        name:req.body.name,
        email: req.body.email,
        message:req.body.message,
        timestamps:user.createdAt
    })
    newUser.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.sendFile(__dirname+"/index.html")
        }
    })
    alert("Thanks for posting");
    res.redirect("/");

})


app.listen(3200,function(req,res){
    console.log("Server 3200 is ON");
})