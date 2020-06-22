const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim:true,
  },
  email: {
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid!')
      }
    }
  },
  mobile: {
    type: Number,
    // required: true
  },
  password: {
    type:String,
    required:true,
    trim:true,
    minlength:6,
    validate(value){
      if(value.toLowerCase().includes('password')){
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  avatar: {
    type: Buffer
  }
},{
  timestamps:true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
