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
    DepartureseatNrs:{
      type: [String],
      required: true
    },
    ReturnseatNrs:{
      type: [String],
      required: true
    },
    
    CheckedIn:{  //0 no, 1
      type: Number,
      required: true
    },
    FlightDep:{
    type:Object,
    required:true
    },
    FlightRet:{
     type:Object,
     required:true
 
     },
     TotalPrice:{
      type:Number,
      required:true
     }
  } 
   );
   
mongoose.models = {}
const Reservation = mongoose.model('Reservations', reservationsSchema);
module.exports = Reservation;