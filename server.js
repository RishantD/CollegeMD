var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var expressSession = require('express-session')
var config = require('./config.js')
var passport = require('passport')

process.env.config = JSON.stringify(config);

mongoose.connect(config.MONGODB.URL);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({
  secret: "collegemdsecretcode",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'));
app.use(express.static("public"))

require('./app/routes/auth')(passport)
require('./app/routes/router.js')(app, passport)

app.listen(config.PORT, function(){
  console.log("Server running on port: " + config.PORT)
})