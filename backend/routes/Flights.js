const flightsRouter = require('express').Router();
const flightsController = require('../Controller/FlightsController');

flightsRouter.post('/',flightsController.createFlights);
flightsRouter.get('/findall',flightsController.getAllFlights);
flightsRouter.put('/update:id',flightsController.updateFlights);
flightsRouter.delete('/delete:id',flightsController.deleteFlights);
flightsRouter.get('/search',flightsController.searchFlights);

module.exports=flightsRouter;

