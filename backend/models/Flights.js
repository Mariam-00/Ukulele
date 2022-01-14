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
    type:[Object],
    required:true
  },
  ReservedBusinessSeats:
  {
    type:[Object],
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
  },
  Duration:
  {
    type:String,
    required:true
  }

} 
 );

mongoose.models = {}
const Flights = mongoose.model('Flights', flightsSchema);
module.exports = Flights;