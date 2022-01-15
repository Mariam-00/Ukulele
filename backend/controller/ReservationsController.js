const Reservation = require('../models/Reservations');
const Flights = require('../models/Flights');
var fl;
var rt;
var flight;
var ren;
var result;
var rest=[];
var finalresult=[];
var reservations;

exports.createReservation =  (req, res)=>
{ 
  const reservation = new Reservation(req.body)
 reservation.save()
 .then(() => res.json(reservation))
 .catch(err => res.status(400).json('Error: ' + err));
}

exports.searchUserReservation= async(req,res)=>
{
   await Reservation.find(req.query).then
   (reservationn => res.json(reservationn))
   .catch(err => res.status(400).json('Error: ' + err));
    
}

// exports.MyBookings= (req,res)=>
// {

//     Reservation.find(req.query).then(reservationn =>{res.json(reservationn);
      
//      for(var i=0;i<reservationn.length;i++){
//       fl = reservationn[i].FlightDepartureNr;
//       rt= reservationn[i].FlightReturnNr;
//       finalresult.push({reservation:reservationn[i]});
//       Flights.findOne({FlightNumber:fl}).then(flig=>result1.json(flig)).catch(err=>result1.status(400).json('Error:'+err));
//     //   Flights.find({FlightNumber:fl}).then( flig=> 
//     //  { console.log(res.json(flig))}).catch(err=>res.status(400).json('Error:'+err))
//       //Flights.find({FlightNumber:rt}).then(flog=>{ res.json(flog) });
//     //   result={Reservation: reservationn[i], FlightDeparture: res.json(flig)
//     //  finalresult.push(result);
//     // console.log(finalresult);
//   }
//    }).catch(err=>res.json(err));
     
// }

exports.MyBookings =(req,res)=>
{
   Reservation.find(req.query).then(reservationn=>{
      res.json(reservationn);
   }).catch(err=>res.status("404").json("Error:"+err));
}


exports.getAllReservations =(req, res)=>
{  
   Reservation.find()
    .then((reservationn) => res.json(reservationn))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateReservation =(req,res)=>
 {
   Reservation.findByIdAndUpdate(req.params.id,req.body).then(result =>{
  
   res.status(200).send("Reservation updated ");
   console.log('The Reservation is Updated successfully !');
}).catch(err => {
   console.log(err);
 });
}

exports.deleteReservation =(req,res)=>
{
   Reservation.findByIdAndDelete(req.params.id).then(result =>{
  
      res.status(200).send("Reservation Deleted ");
      console.log('The Reservation has been Deleted successfully !');
   }).catch(err => {
      console.log(err);
    });
}

exports.getReservation =(req,res)=>
 {
   Reservation.findById(req.params.id)
   .then(Reservations => res.json(Reservations))
   .catch(err => res.status(400).json('Error: ' + err));

}