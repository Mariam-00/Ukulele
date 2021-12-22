const reservationsRouter = require('express').Router();
const reservationsController = require('../Controller/ReservationsController');

reservationsRouter.post('/',reservationsController.createReservation);
reservationsRouter.get('/search',reservationsController.searchUserReservation);
reservationsRouter.get('/findall',reservationsController.getAllReservations);
reservationsRouter.delete('/delete/:id',reservationsController.deleteReservation);
reservationsRouter.put('/update/:id',reservationsController.updateReservation);
reservationsRouter.get('/:id',reservationsController.getReservation);
module.exports=reservationsRouter;