const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const uuid =require('uuid/v4');
const stripe = require("stripe")("sk_test_51KHYYqFthQdbjWDo3G0D1y9ifAegziYpy0yPBwcn7Wf0BuN1MybV8u7rjKWwmtZJvOGmJ9uTwuSf6Zac29w5SDde00UjlDjmEo")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
const MongoURI = process.env.ATLAS_URI;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const flightsRouter = require('./routes/Flights');
const usersRouter = require('./routes/Users');
const reservationsRouter = require('./routes/Reservations');
const emailsRouter = require('./routes/Emails');
const paymentsRouter=require('./routes/Payments');

app.use('/flights', flightsRouter);
app.use('/users', usersRouter);
app.use('/reservations', reservationsRouter);
app.use('/emails', emailsRouter);

app.post("/payment",(req,res)=>
{
	const { totalPrice, token } = req.body;

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: totalPrice * 100,
          currency: "egp",
          customer: customer.id,
          receipt_email: token.email,
        },
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));

})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


 

