const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightsSchema = new Schema({
  FlightNumber: {
    type: String,
    required: true,
    
  },
  DepartureTime: {
    type: String,
    required: true
  },
  ArrivalTime: {
    type: String ,
    required: true,
  },
  Date: {
    type: Date,
    required: true
  },
  NrEconomySeats: {
    type: Number,
    required: true
  },
  NrBusinessSeats: {
    type: Number,
    required: true
  },
  Airport: {
    type: String,
    required: true
  }
} 
 );

mongoose.models = {}
const Flights = mongoose.model('Flights', flightsSchema);
module.exports = Flights;