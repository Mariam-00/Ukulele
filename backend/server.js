const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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

app.use('/flights', flightsRouter);
app.use('/users', usersRouter);
app.use('/reservations', reservationsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


 

