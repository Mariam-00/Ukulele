Project Title: The project is a website for an Airline Resrvation Online System named FlyFast. Every user can search for available flights all around the world by entering  where they want to go, when do they want to visit this place and how many passengers will be reserving this flight. Our website displays all available flights along with their pricing, and the user may book and pay for them.

Motivation: Our project was designed to be simple and fast, from searching to reserving even paying for the flight.This allows the user to save alot of time instead of going to the airport or any Flight Booking office to reserve the flights.

/////Build Status: Our Website is fully functional

Code Styles: We aim for our code to be easy to read so here are some code styles we used: 1-Vertical indents: empty lines inside functions for splitting code into logical blocks. 2-meaningful variable names 3-Prettier code formatter for easier code reading

Screenshots: here is a link for a demo of our website: https://drive.google.com/drive/folders/1ZIa04qAriagPm2zOW3MBX-INS5knJpw3?usp=sharing

Tech/Framework used: We implemented the project using the mern(MongoDB,Express,React,NodeJS)stack. Some additional tech used: The API used between the front end and the server is AXIOS, mongoose is used as the API between the server and mongoDB, nodemailer is used to email the user, stripe API is used for payment.

Features: You may easily surf the website and locate everything you're looking for. Flights may be found depending on travel dates, destinations, passenger count, and cabin class. The website will display all flights that meet the requirements, the user can also select whether he wants to book the flight as a one way trip or a round trip and the user can choose any departure and return flight based on pricing or departure and arrival times. The user can then continue to select the seats that he or she desires, but in order to do so, the user must first login. If the user does not already have an account on the website, he or she can create one. After that, the user can confirm the seats and pay for them.The user will receive a confirmation email. The website allows users to alter their reserved seats on a certain trip, book another departure/return flight with a different date or cabin, and cancel their entire reservation. A logged in user's home page displays all of his or her reservations and allows them to email the itinerary to themselves. Another feature of our website is the ability to edit user information, including passwords.

Code Examples: const checkPassword=async(req,res,next)=>
{
   const passIsValid = await authUtils.comparePass(
      req.body.OldPassword,
      req.body.Password
    );
    if(passIsValid)
    {  
       
      const newPassword= await authUtils.hashPass(req.body.NewPassword);
      req.body= {Password:newPassword};
      next();
    }
    else
    {
       const err= new Error("Invalid Old Password")
       next(err);
    }

}


exports.createReservation =  (req, res)=>
{ 
  const reservation = new Reservation(req.body)
 reservation.save()
 .then(() => res.json(reservation))
 .catch(err => res.status(400).json('Error: ' + err));
}
exports.getAllUsers =(req, res)=>
{  
   Users.find()
    .then(Users => res.json(Users))
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

Installation: To install all required modules, use the npm install command in both the frontend and backend folders before running the project. You'll also need to add these variables to a.env file in the backend folder: URI=insert the URL to your MongoDB instance. EMAIL=Enter the email address that will be used to send information to the users. EMAIL PASSWORD=enter the password for the email address above. JWT SECRET= To hash the sign in token, you may use pretty much anything.

Tests
 1-Register as a New User (Enter first name , last name , email,  username, password, passport number  ,address, country code and mobile number) 
Then we put all the values as a new User entity in Database

exports.createUser = async (req, res)=>
{ 
  const user = req.body;
  console.log(req.body)
  user.Password=await authUtils.hashPass(user.Password);
 await  Users.create(user)
 .then(() => res.json('user added!'))
 .catch(err => res.status(400).json('Error: ' + err));
}




2- Edit user info: (change any criteria related to the user(except password) and reflect the changes in the database) 

exports.updateUsers =(req,res)=>
 {
Users.findByIdAndUpdate(req.params.id,req.body).then(result =>{
  
   res.status(200).send("User updated ");
   console.log('The User has been updated successfully !');
}).catch(err => {
   console.log(err);
 });
}




3-Search for a flight: (Enter some flight criteria , and return fully detailed flights matching the criteria) 
exports.searchFlights= async(req,res)=>
{
   await Flights.find(req.query).then
   (Flights => res.json(Flights))
   .catch(err => res.status(400).json('Error: ' + err));
    
}

How to Use?: After installing and configuring the files in the installation section, you need to run both the front-end and back-end folders. Run the backend folder using the NodeApp command. Run the frontend folder using the  npm runstart command. Then the website will open in your browser. The home page of our website is displayed, you can search for  dates and destinations, navigate  the website smoothly and perform various functions of our website such as: B. Book your flight and select a seat or log in to edit your information

Credits: some useful links: React Crash Course:https://www.youtube.com/watch?v=w7ejDZ8SWv8 jwt authentication:https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57 mern repository:https://github.com/beaucarnes/mern-exercise-tracker-mongodb