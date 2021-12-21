const reservationsRouter = require('express').Router();
const reservationsController = require('../Controller/ReservationsController');

reservationsRouter.post('/',reservationsController.createReservation);
reservationsRouter.get('/search',reservationsController.searchUserReservation);
reservationsRouter.get('/findall',reservationsController.getAllReservations);

module.exports=reservationsRouter;

