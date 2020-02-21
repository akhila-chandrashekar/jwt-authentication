const mongoose = require('mongoose');
const environment = process.env.NODE_ENV || 'development';
const config = require('../config/local_config')[environment];
const bcrypt = require('bcryptjs')
// schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: 'String',
    required: true,
    trim: true
  },
  email: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  }
}, {timestamps:true});
// encrypt password before save
userSchema.pre('save', function(next) {
    const user = this;
    console.log(user.isModified, user.isNew);
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
      next();
    } else {
      bcrypt.hash(user.password, config.saltingRounds, function(err, hash) {
        if (err) {
          console.log('Error hashing password for user', user.name);
          next(err);
        } else {
          user.password = hash;
          next();
        }
      });
    }
});

module.exports = mongoose.model('User', userSchema);