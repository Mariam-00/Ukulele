const { useParams } = require('react-router');
const Users = require('../models/Users');
const authUtils = require("../utils/auth");


exports.createUser = async (req, res)=>
{ 
  const user = req.body;
  console.log(req.body)
  user.Password=await authUtils.hashPass(user.Password);
 await  Users.create(user)
 .then(() => res.json('user added!'))
 .catch(err => res.status(400).json('Error: ' + err));
}

exports.getUser =(req,res)=>
 {
   Users.findById(req.params.id)
   .then(User => res.json(User))
   .catch(err => res.status(400).json('Error: ' + err));

}
// exports.verifyUser=(req,res)=>
// {
//    Users.find(req.query).then
//    (Users => res.json(Users))
//    .catch(err => res.status(400).json('Error: ' + err));
    
// }
const findUserEmail = async (req, res, next) => {
   try {
     const user = req.body.user;
     const { Email } = user;
     const userFound = await Users.findOne({ Email });
     if (userFound) {
       req.user = userFound;
       next();
     } else {
       const error = new Error("User Not Found");
       next(error);
     }
   } catch (err) {
     next(err);
   }
 };
const authenticateUser= async(req,res,next)=>
{
   const passIsValid = await authUtils.comparePass(
      req.body.user.Password,
      req.user.Password
    );
    if (passIsValid) {
      next();
    } else {
      const err = new Error("Invalid email or password");
      next(err);
    }
}
const checkAdmin = async (req, res, next) => {
   try {
     const user = req.user;
     if (user.Type==="Admin") {
       req.typeOfUser = "admin";
     } else {
       req.typeOfUser = "user";
     }
     next();
   } catch (err) {
     next(err);
   }
 };
 const generateJWT = async (req, res, next) => {
   try {
     const user = req.user;
     const token = authUtils.generateToken(user);
     if (token) {
       req.token = token;
       next();
     } else {
       const error = new Error("Cannot generate token");
       next(error);
     }
   } catch (err) {
     next(err);
   }
 };

exports.updateUsers =(req,res)=>
 {
Users.findByIdAndUpdate(req.params.id,req.body).then(result =>{
  
   res.status(200).send("User updated ");
   console.log('The User has been updated successfully !');
}).catch(err => {
   console.log(err);
 });
}
exports.getAllUsers =(req, res)=>
{  
   Users.find()
    .then(Users => res.json(Users))
    .catch(err => res.status(400).json('Error: ' + err));
}

 exports.loginPipeline = [
   findUserEmail,
   checkAdmin,
   authenticateUser,
   generateJWT,
 ];




