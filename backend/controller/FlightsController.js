const Flights = require('../models/Flights');

exports.createFlights =  (req, res)=>
{ 
  const flight = new Flights(req.body)
  flight.save()
 .then(() => res.json('flight added!'))
 .catch(err => res.status(400).json('Error: ' + err));
}

exports.getAllFlights =(req, res)=>
{  
   Flights.find()
    .then((Flights) => res.json(Flights))
    .catch(err => res.status(400).json('Error: ' + err));
}


exports.getFlight =(req,res)=>
 {
   Flights.findById(req.params.id)
   .then(Flights => res.json(Flights))
   .catch(err => res.status(400).json('Error: ' + err));

}

exports.updateFlights =(req,res)=>
 {
Flights.findByIdAndUpdate(req.params.id,req.body).then(result =>{
  
   res.status(200).send("Flight updated ");
   console.log('The Flight is Updated successfully !');
}).catch(err => {
   console.log(err);
 });
}

exports.deleteFlights =(req,res)=>
{
   Flights.findByIdAndDelete(req.params.id).then(result =>{
  
      res.status(200).send("Flight Deleted ");
      console.log('The Flight is Deleted successfully !');
   }).catch(err => {
      console.log(err);
    });
}
exports.searchFlights=(req,res)=>
{
   Flights.find(req.query).then
   (Flights => res.json(Flights))
   .catch(err => res.status(400).json('Error: ' + err));
    
}


