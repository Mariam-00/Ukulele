const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true
  }
} 
 );

mongoose.models = {}
const User = mongoose.model('User', userSchema);
module.exports = User;