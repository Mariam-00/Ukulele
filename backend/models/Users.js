const { Password } = require('@mui/icons-material');
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
  },

    Reservations : [{
      userId : String,
      flightNr : String,
      NrPassengers: Number,
      economyOrbusiness : Number, //1 eco, 2 bus
      seatNr:[String]
       }]
 
} 
 );

mongoose.models = {}
const User = mongoose.model('User', userSchema);
module.exports = User;