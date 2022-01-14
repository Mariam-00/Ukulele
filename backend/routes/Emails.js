const emailRouter = require('express').Router();
const emailController = require('../controller/EmailController');

emailRouter.post("/cancellation", emailController.sendCancellation);
emailRouter.post("/emailItinerary", emailController.sendItenerary);

module.exports=emailRouter;