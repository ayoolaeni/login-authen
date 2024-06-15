const express = require ("express");
const authController = require("../controller/auth")

const router = express.Router();

router.get("/", authController.isLoggedin, (req,res)=>{
    res.render("index", {
        user:req.user
    })
    // res.send("<h1>Hello World</h1>")
});

router.get("/login", (req,res)=>{
    res.render("login")
    // res.send("<h1>Hello World</h1>")
});

router.get("/register", (req,res)=>{
    res.render("register")
    // res.send("<h1>Hello World</h1>")
});

router.get("/profile", authController.isLoggedin, (req,res)=>{

    if(req.user){
        res.render("profile", {
            user : req.user
        });
    } else {
        res.redirect('/login');
    }
})

module.exports = router;


