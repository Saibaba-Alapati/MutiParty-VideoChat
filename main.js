const express = require('express');


const app = express();



const server = app.listen(8000,function(){
    console.log('Listening on Port 8000');
})

app.use(express.static('public'));