import React, { useState } from 'react';
import {Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {blue, purple } from '@material-ui/core/colors';
//import Image from '../images/back1.jpeg'; // Import using relative path
import BottomNavigation from '@material-ui/core/BottomNavigation';
//import './admin/login.css'
import axios from 'axios';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Flights
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[1000],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form_login: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
 
}));

export default function Login() {
  const classes = useStyles();

 
  const [Email,setEmail]= useState();
  const [Password,setPassword]= useState();
 
  
  
 



  const handleSubmit = (e)=>{
    e.preventDefault();
     
     
       const user ={Email:Email,Password:Password}
        axios.post('http://localhost:8000/users/login',{user:user})
        .then(res => {
            if(res.data.length==0)
            {
                localStorage.setItem("zero",1);
            }
            else if(res.data.length>0)
            {
                localStorage.setItem("zero",0);
            }
            localStorage.setItem("message", res.data.message);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("typeOfUser",res.data.typeOfUser);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            localStorage.setItem("userId",res.data.user._id);
            localStorage.setItem("User",res.data.user);

            if(localStorage.getItem("typeOfUser")==="Admin")
        {
            window.location.href="/adminHome";
        }
        else
        {   const user = localStorage.getItem("User");
           console.log(user);
            //console.log(id);
            const userId=localStorage.getItem("userId");
           
        if(localStorage.getItem("searchlinkreturn")===null)
        {
            window.location.href="/bookings/"+userId;
        }
        else
        {
            window.location.href="/confirm";
        }
        }

         } )
         .catch(
            function(error){
            alert("Invalid Email Or Password");
            }
        
       );
               
        
     }
     

return (
  <div   style={{
    // backgroundImage: "linear-gradient(to right,#800080 0%,#ff9800 100%)",
    height: "101vh",
    margin:-10,
    padding:0,
    textAlign: "center"
  }}>
  <div className="App" maxwidth="xs">
    <form className="form_login" noValidate onSubmit = {handleSubmit}>
    <div className={classes.paper} background-color="#ffffff">
    <Avatar className={classes.avatar}>
      <AccountCircleIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
         Login
        </Typography>
 
  
   
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Email"
            label="Email"
            id="email"
            onChange = {e =>setEmail(e.target.value)}
          />
   <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            id="password"
            onChange = {e =>setPassword(e.target.value)}
          />
 







     

      <ColorButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
       Login
        </ColorButton>

     

         

      </div>
      <br/>
                <Link href="/sign-up" variant="body2">
                {" Don't Have An Account? Sign Up"}
              </Link>
              <br/>
                <Link href="/search-available" variant="body2">
                {"Continue As A Guest"}
              </Link>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  </div>
  </div>
);

  
  }