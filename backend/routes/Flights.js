const flightsRouter = require('express').Router();
const flightsController = require('../Controller/FlightsController');
//const usersController = require('../Controller/UsersController');
const Users = require('../models/Users');
flightsRouter.post('/',flightsController.createFlights);
flightsRouter.get('/findall',flightsController.getAllFlights);
flightsRouter.put('/update:id',flightsController.updateFlights);
flightsRouter.delete('/delete:id',flightsController.deleteFlights);
flightsRouter.get('/search',flightsController.searchFlights);
flightsRouter.get('/find/:id',flightsController.getFlight);

module.exports=flightsRouter;

