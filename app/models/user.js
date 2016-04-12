var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var UserSchema = new Schema({
	createdAt: {type: Date, default: Date.now},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	name: {
	  first: {type: String, required: true},
	  last: {type: String, required: true}
	}
});

UserSchema.pre('save', function(cb){
  var user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt){
      if (err) return cb(err)
      bcrypt.hash(user.password, salt, function(err, hash){
        if (err) return cb(err)
        user.password = hash
        cb()
      })
    })
  }
  else {
    cb()
  }
});

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch){
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

UserSchema.methods.toJSON = function() {
  var user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model('User', UserSchema);
