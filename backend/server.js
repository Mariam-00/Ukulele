const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

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

app.use('/flights', flightsRouter);
app.use('/users', usersRouter);
app.use('/reservations', reservationsRouter);
app.use('/emails', emailsRouter);
app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Flight",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


 

