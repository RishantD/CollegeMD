var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var mongoose = require('mongoose');
var morgan = require('morgan');


var config = require('./config.js');
process.env.config = JSON.stringify(config);
app.use(morgan('dev'));

mongoose.connect(config.MONGODB.URL);

app.use(express.static("public"));

require('./app/routes/router.js')(app);

app.listen(config.PORT);
console.log("Server running");