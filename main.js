const express = require('express');
const cors = require('cors');
require('dotenv').config();
const session = require("express-session");
const cookieParser = require('cookie-parser');


// IMPORTING ROUTERS

//app
const app = express();
//middlewares
app
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cors())
    .use(cookieParser())
    .use(session({
        name: process.env.SESS_NAME,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge:null,
            sameSite:true,
        }
    }))
    // .use(passport.session())
    // .use(passport.initialize());
//test requests
app.get('/testReq',(req,res) => {
    res.send('Hello All');
});
app.post('/testReq', (req,res) => {
    console.log('POST WORK');
    console.log(req.body.name);
    res.json(req.body.name);
});


//routes

const PORT = process.env.PORT||8080;

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});



app.delete('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/login')
})
