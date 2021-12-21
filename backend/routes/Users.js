const usersRouter = require('express').Router();
const usersController = require('../controller/UsersController');

usersRouter.post('/',usersController.createUser);
usersRouter.put('/update:id',usersController.updateUsers);
usersRouter.get('/:id',usersController.getUser);
usersRouter.get('/findall',usersController.getAllUsers);

module.exports=usersRouter;
