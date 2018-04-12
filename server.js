const express = require('express');
const path = require('path');
const api = require('./api');
const port = 3000;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

app.use('/', api);

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});