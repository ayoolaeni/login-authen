const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

const app = express()
dotenv.config({path : "./.env"});

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
})

db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MySql is connected ")
    }
})

app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//parse url encoded body (as sent from the HTML)
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cookieParser());

//ROUTER
app.use("/", require( "./router/pages"));
app.use("/auth", require("./router/auth"));

app.listen(5005, ()=>{
    console.log("Server is running on port 5005")
})