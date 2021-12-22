
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
    required: true
  },
  Password:{
    type: String,
    required: true
  },
  MobileNumber:{
    type: String,
    required: true
<<<<<<< HEAD
  }

   
 
=======
  },
  PassportNumber: {
    type: String,
    required: true
  },
>>>>>>> 8ddde792d90f110d909e0865a74105180ecb4d2a
} 
 );

mongoose.models = {}
const User = mongoose.model('User', userSchema);
module.exports = User;
