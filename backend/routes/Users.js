const usersRouter = require('express').Router();
const usersController = require('../controller/UsersController');

usersRouter.get('/findall',usersController.getAllUsers);
usersRouter.post('/',usersController.createUser);
//usersRouter.get('/v/Login',usersController.verifyUser);
usersRouter.put('/update/:id',usersController.updateUsers);
usersRouter.get('/:id',usersController.getUser);
usersRouter.post("/login", usersController.loginPipeline, async (req, res) => {
    res.status(200).json({
      message: "Logged in successfully",
      typeOfUser: req.typeOfUser,
      token: req.token,
      user: req.user,
    });
  });
  



module.exports=usersRouter;
