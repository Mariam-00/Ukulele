const Reservation = require('../models/Reservations');

exports.createReservation =  (req, res)=>
{ 
  const reservation = new Reservation(req.body)
 reservation.save()
 .then(() => res.json('reservation added!'))
 .catch(err => res.status(400).json('Error: ' + err));
}

exports.searchUserReservation=(req,res)=>
{
   Reservation.find(req.query).then
   (reservationn => res.json(reservationn))
   .catch(err => res.status(400).json('Error: ' + err));
    
}

exports.getAllReservations =(req, res)=>
{  
   Reservation.find()
    .then((reservationn) => res.json(reservationn))
    .catch(err => res.status(400).json('Error: ' + err));
}

