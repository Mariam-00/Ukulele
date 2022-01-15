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

export default function AdminCreateFlight() {
  const classes = useStyles();

  const [FlightNumber,setFlightNumber]= useState();
  const [DepartureTime,setDepartureTime]= useState();
  const [ArrivalTime,setArrivalTime]= useState();
  const [NrEconomySeats,setNrEconomySeats]= useState();
  const[NrBusinessSeats,setNrBusinessSeats]=useState();
  const[date,setDate]=useState();
  const[ArrivalAirport,setArrivalAirport]=useState();
  const[DepartureAirport,setDepartureAirport]=useState();
  const[priceEconomy,setPriceEconomy]=useState();
  const[priceBusiness,setPriceBusiness]=useState();
  const[duration,setDuration]=useState();
  
 



  const handleSubmit = (e)=>{
    e.preventDefault();
     if(FlightNumber==null ||FlightNumber =="" ){
       //setError("Please enter a valid Flight Number")
     }
     else if(DepartureTime==null || DepartureTime=="" ){
      //setError("Please enter a valid Departure Time")
     }
     else if(ArrivalTime==null || ArrivalTime=="" ){
        //setError("Please enter a valid Arrival Time")
       }
     else if(NrEconomySeats==null || NrEconomySeats=="" ){
        //setError("Please enter a valid Number of Economy Seats")
       } 
    else if(NrBusinessSeats==null || NrBusinessSeats=="" ){
        //setError("Please enter a valid Number of Business Seats")
       }
     else if(ArrivalAirport==null || ArrivalAirport=="" ){
        //setError("Please enter a valid Airport Name")
       }    
     else{ 
       var reservedEconomy=[];
       for(var i=0;i<NrEconomySeats;i++)
       {
         const seatname = "S"+i;
         reservedEconomy.push({SeatId: seatname, Available:1});
       }
       var reserevedBusiness=[];
       for(var i=0;i<NrBusinessSeats;i++)
       {
         reserevedBusiness.push({SeatId:"S"+i, Available:1});
       }

       const flight ={FlightNumber:FlightNumber,DepartureTime:DepartureTime,ArrivalTime:ArrivalTime,Date:date,NrEconomySeats:NrEconomySeats,NrBusinessSeats,DepartureAirport:DepartureAirport,ArrivalAirport:ArrivalAirport,ReservedEconomySeats:reservedEconomy,ReservedBusinessSeats:reserevedBusiness,PriceEconomy:priceEconomy,PriceBusiness:priceBusiness,Duration:duration}
      //  localStorage.setItem("flightnumber",FlightNumber)
      //  localStorage.setItem("depTime",DepartureTime)
        axios.post('http://localhost:8000/flights/',flight)
        .then(res => console.log(res.data))  .then(
          ()=>{
            alert("Flight Created Successfully!");
          })
               
        
     }}
     

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
          Create A Flight
        </Typography>
    <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="flightNr"
            label="Flight Number"
            name="flight number"
            autoComplete="flight number"
            autoFocus
            onChange = {e =>setFlightNumber(e.target.value)}
          />
    <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="departure time"
            label="Departure Time"
            id="departureTime"
            //autoComplete="current-password"
            onChange = {e =>setDepartureTime(e.target.value)}
          />
   <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="arrival time"
            label="Arrival Time"
            id="arrivalTime"
            //autoComplete="current-password"
            onChange = {e =>setArrivalTime(e.target.value)}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Date"
            label="Date"
            id="date"
            //autoComplete="current-password"
            onChange = {e =>setDate(e.target.value)}
          />
   <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="number economy seats"
            label="Number Of Economy Seats"
            id="nrEconomy"
            //autoComplete="current-password"
            onChange = {e =>setNrEconomySeats(e.target.value)}
          />
  <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="number business seats"
            label="Number Of Business Seats"
            id="nrBusiness"
            //autoComplete="current-password"
            onChange = {e =>setNrBusinessSeats(e.target.value)}
          />
  <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="departureAirport"
            label="Departure Airport"
            id="departureAirport"
            //autoComplete="current-password"
            onChange = {e =>setDepartureAirport(e.target.value)}
          />

<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Arrival Airport"
            label="Arrival Airport"
            id="ArrivalAirport"
            //autoComplete="current-password"
            onChange = {e =>setArrivalAirport(e.target.value)}
          />

<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Price Economy"
            label="Price Economy"
            id="PriceEconomy"
            //autoComplete="current-password"
            onChange = {e =>setPriceEconomy(e.target.value)}
          />

<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Price Business"
            label="Price Business"
            id="PriceBusiness"
            //autoComplete="current-password"
            onChange = {e =>setPriceBusiness(e.target.value)}
          />

<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Duration"
            label="Duration"
            id="duration"
            //autoComplete="current-password"
            onChange = {e =>setDuration(e.target.value)}
          />
     

      <ColorButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
       Create 
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