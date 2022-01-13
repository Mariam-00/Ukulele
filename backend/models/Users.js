
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
 LastName: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true
  },
  Email:{
    type: String,
    required: true,
    unique:true
  },
  Password:{
    type: String,
    required: true
  },
  Address:
  { 
    type:String,
    required:true
  },
  CountryCode:
  { 
    type:String,
    required:true
  },
  MobileNumber:{
    type: String,
    required: true
  },
 PassportNumber: {
    type: String,
    required: true
  },
  

} 
 );

mongoose.models = {}
const User = mongoose.model('User', userSchema);
module.exports = User;
