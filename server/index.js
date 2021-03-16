const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/../client/dist'));

app.listen(1337, function() {
    console.log('listening on port 1337!');
});
