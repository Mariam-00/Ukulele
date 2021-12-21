const Users = require('../models/Users');

exports.createUser =  (req, res)=>
{ 
  const user = new Users(req.body)
 user.save()
 .then(() => res.json('user added!'))
 .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateUsers =(req,res)=>
 {
Users.findByIdAndUpdate(req.params.id,req.body).then(result =>{
  
   res.status(200).send("User updated ");
   console.log('The User has been updated successfully !');
}).catch(err => {
   console.log(err);
 });
}
exports.getAllUsers =  (req, res)=>
{  
   Users.find()
    .then(User => res.json(User))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.getUser =(req,res)=>
 {
   Users.findById(req.params.id)
   .then(User => res.json(User))
   .catch(err => res.status(400).json('Error: ' + err));

}
//61c09e15b82f5f714d01578a