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
import {purple } from '@material-ui/core/colors';
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
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
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

export default function SignUp() {
  const classes = useStyles();

  const [FirstName,setFirstName]= useState();
  const [LastName,setLastName]= useState();
  const [Email,setEmail]= useState();
  const [Password,setPassword]= useState();
  const[MobileNumber,setMobileNumber]=useState();
  const[PassportNumber,setPassportNumber]=useState();
  const[Address,setAddress]=useState();
  const[CountryCode,setCountryCode]=useState();
  
  
 



  const handleSubmit = (e)=>{
    e.preventDefault();
     
     
       const user ={FirstName:FirstName,LastName:LastName,Type:"User",Email:Email,Password:Password,Address:Address,CountryCode:CountryCode,MobileNumber:MobileNumber,PassportNumber:PassportNumber}
        axios.post('http://localhost:8000/users/',user)
        .then(res => console.log(res.data))  .then(
          ()=>{
            window.location.href="/";
          })
               
        
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
         Sign Up
        </Typography>
    <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="first name"
            onChange = {e =>setFirstName(e.target.value)}
          />
    <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Last Name"
            label="Last Name"
            id="lastName"
            onChange = {e =>setLastName(e.target.value)}
          />
   
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
   <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Address"
            label="Address"
            id="address"
            onChange = {e =>setAddress(e.target.value)}
          />
  <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Country Code"
            label="Country Code"
            id="countryCode"
            onChange = {e =>setCountryCode(e.target.value)}
          />

  <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Mobile Number"
            label="Mobile Number"
            id="mobileNumber"
            onChange = {e =>setMobileNumber(e.target.value)}
          />
  <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Passport Number"
            label="Passport Number"
            id="passportNumber"
            onChange = {e =>setPassportNumber(e.target.value)}
          />






     

      <ColorButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
       Sign Up
        </ColorButton>

     

         

      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  </div>
  </div>
);

  
  }