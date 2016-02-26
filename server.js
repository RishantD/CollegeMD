var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var config = require('./config.js');
process.env.config = JSON.stringify(config);
app.use(morgan('dev'));

mongoose.connect(config.MONGODB.URL);

app.use(express.static("public"));

require('./app/routes/router.js')(app);

app.listen(config.PORT);
console.log("Server running");