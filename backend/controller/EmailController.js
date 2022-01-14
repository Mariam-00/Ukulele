const email = require("../controller/email");

exports.sendCancellation = (req, res, next) => {
    var user = req.body.userEmail;
    var price = req.body.price;
    var id = req.body.resid;
  
    var mailOptions = {
      to: user,
      subject: "Reservation Cancellation",
      text: `Kindly note that your Reservation: ${id} has been cancelled. The total refunded price is: ${price}`,
    };

    req.mailOptions = mailOptions;

    email.sendEmail(req, res, next);
    res.status(200).json({ message: "Sent successfully" });

  };

  exports.sendItenerary = (req, res, next) => {
    var user = req.body.userEmail;
    var reservation = req.body.reservation;
  
    var mailOptions = {
      to: user,
      subject: "Your Itinerary ",
      text: `Reservation number: ${reservation._id}. 
  
      Departure Flight: ${reservation.FlightDep.FlightNumber} 
      From: ${reservation.FlightDep.DepartureAirport}
      To: ${reservation.FlightDep.ArrivalAirport}
      Date:${reservation.FlightDep.Date} 
      Departure Time:${reservation.FlightDep.DepartureTime} 
      Arrival Time:${reservation.FlightDep.ArrivalTime} 
      Number of Passengers: ${reservation.NrPassengers}
      Class: ${reservation.EconomyorBusiness==1? "Economy":"Business"}
      Baggage: ${reservation.EconomyorBusiness==1? "Two 23 KG Bags":"Two 32 KG Bags"}
      Seats:${reservation.DepartureseatNrs}
      Price: ${reservation.EconomyorBusiness==1? reservation.FlightDep.PriceEconomy: reservation.FlightDep.PriceBusiness}
     

      
      Return Flight: ${reservation.FlightRet.FlightNumber} 
      From: ${reservation.FlightRet.DepartureAirport}
      To: ${reservation.FlightRet.ArrivalAirport}
      Date:${reservation.FlightRet.Date} 
      Departure Time:${reservation.FlightRet.DepartureTime} 
      Arrival Time:${reservation.FlightRet.ArrivalTime} 
      Number of Passengers: ${reservation.NrPassengers}
      Class: ${reservation.EconomyorBusiness==1? "Economy":"Business"}
      Baggage: ${reservation.EconomyorBusiness==1? "Two 23 KG Bags":"Two 32 KG Bags"}
      Seats:${reservation.ReturnseatNrs}
      Price: ${reservation.EconomyorBusiness==1? reservation.FlightRet.PriceEconomy: reservation.FlightRet.PriceBusiness}

  
       Total Price:${reservation.TotalPrice}.`
    };
    req.mailOptions = mailOptions;
    email.sendEmail(req, res, next);
    res.status(200).json({ message: "Sent successfully" });
  };
  