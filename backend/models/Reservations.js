
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationsSchema = new Schema({
    userId: {
      type: Object,
      required: true,
    },
   NrPassengers: {
      type: Number,
      required: true,
    },
    EconomyorBusiness: {  //1 eco, 2 bus
      type: Number,
      required: true
    },
    seatNrs:{
      type: [String],
      required: true
    },
    FlightDepartureNr:{
      type: String,
      required: true
    },
    FlightReturnNr:{
      type: String,
      required: true
    }
  } 
   );
   
mongoose.models = {}
const Reservation = mongoose.model('Reservations', reservationsSchema);
module.exports = Reservation;