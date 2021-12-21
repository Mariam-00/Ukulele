const usersRouter = require('express').Router();
const usersController = require('../controller/UsersController');

usersRouter.post('/',usersController.createUser);
usersRouter.get('/findall',usersController.getAllUsers);
usersRouter.put('/update:id',usersController.updateUsers);
usersRouter.get('/:id',usersController.getUser);



module.exports=usersRouter;
