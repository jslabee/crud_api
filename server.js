const express = require('express');
const path = require('path');
const api = require('./api');
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', api);

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});