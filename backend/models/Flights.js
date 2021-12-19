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
    type:String ,
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
  DepartureAirport: {
    type: String,
    required: true
  },
  ArrivalAirport :
  {
    type: String,
    required: true
  },
  ReservedEconomySeats:
  {
    type:[Number],
    required:true
  },
  ReservedBusinessSeats:
  {
    type:[Number],
    required:true
  }
  ,
  PriceEconomy:
  {
    type:Number,
    required:true
  },
  PriceBusiness:
  {
    type:Number,
    required:true
  }

} 
 );

mongoose.models = {}
const Flights = mongoose.model('Flights', flightsSchema);
module.exports = Flights;