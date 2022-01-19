import React, { useState } from 'react';
import {Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {blue,purple } from '@material-ui/core/colors';
//import Image from '../images/back1.jpeg'; // Import using relative path
import BottomNavigation from '@material-ui/core/BottomNavigation';
//import './admin/login.css'
import axios from 'axios';

import {
  AppBar,
  Toolbar,
  CssBaseline,
  withMobileDialog,
} from "@material-ui/core";













export default function AdminCreateFlight() {
  const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
  }))
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
  
 

//   const customStyles = {
//     content : {
//       top                   : '50%',
//       left                  : '50%',
//       right                 : 'auto',
//       bottom                : 'auto',
//       marginRight           : '-50%',
//       transform             : 'translate(-50%, -50%)',
//       backgroundColor       : '#FFFFFF'      
//     }
// }; 

  const handleSubmit = (e)=>{
    e.preventDefault();
     if(FlightNumber==null ||FlightNumber =="" ){
      
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
         reservedEconomy.push({SeatId: "S"+i, Available:1});
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
  <div>
    
     <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
           FlyFast
          </Typography>
            <div className={classes.navlinks}>
              <Link to={"/create-flights"} className={classes.link}>
                Create A Flight
              </Link>
              <Link to={"/list-flights"} className={classes.link}>
                List All Flights
              </Link>
              <Link to={"/search-flights"} className={classes.link}>
               Search For A Flight
              </Link>
            
            </div>
        </Toolbar>
      </AppBar>
  
      <br/>
      <br/>
      <h1> Create A Flight</h1>
    <TextField
            variant="outlined"
            margin="normal"
            required
            id="flightNr"
            label="Flight Number"
            name="flight number"
            autoComplete="flight number"
            autoFocus
            onChange = {e =>setFlightNumber(e.target.value)}
          />
          <br/>
    <TextField
            variant="outlined"
            margin="normal"
            required
            name="departure time"
            label="Departure Time"
            id="departureTime"
            //autoComplete="current-password"
            onChange = {e =>setDepartureTime(e.target.value)}
          />
          <br/>
   <TextField
            variant="outlined"
            margin="normal"
            required
            name="arrival time"
            label="Arrival Time"
            id="arrivalTime"
            //autoComplete="current-password"
            onChange = {e =>setArrivalTime(e.target.value)}
          />
          <br/>
           <TextField
            variant="outlined"
            margin="normal"
            required
            name="Date"
            label="Date"
            id="date"
            //autoComplete="current-password"
            onChange = {e =>setDate(e.target.value)}
          />
          <br/>
   <TextField
            variant="outlined"
            margin="normal"
            required
            name="number economy seats"
            label="Number Of Economy Seats"
            id="nrEconomy"
            //autoComplete="current-password"
            onChange = {e =>setNrEconomySeats(e.target.value)}
          />
          <br/>
  <TextField
            variant="outlined" 
            margin="normal"
            required
            name="number business seats"
            label="Number Of Business Seats"
            id="nrBusiness"
            //autoComplete="current-password"
            onChange = {e =>setNrBusinessSeats(e.target.value)}
          />
          <br/>
  <TextField
            variant="outlined"
            margin="normal"
            required
            name="departureAirport"
            label="Departure Airport"
            id="departureAirport"
            //autoComplete="current-password"
            onChange = {e =>setDepartureAirport(e.target.value)}
          />
          <br/>

<TextField
            variant="outlined"
            margin="normal"
            required
            name="Arrival Airport"
            label="Arrival Airport"
            id="ArrivalAirport"
            //autoComplete="current-password"
            onChange = {e =>setArrivalAirport(e.target.value)}
          />
          <br/>

<TextField
            variant="outlined"
            margin="normal"
            required
            name="Price Economy"
            label="Price Economy"
            id="PriceEconomy"
            //autoComplete="current-password"
            onChange = {e =>setPriceEconomy(e.target.value)}
          />
          <br/>

<TextField
            variant="outlined"
            margin="normal"
            required
            name="Price Business"
            label="Price Business"
            id="PriceBusiness"
            //autoComplete="current-password"
            onChange = {e =>setPriceBusiness(e.target.value)}
          />
          <br/>

<TextField
            variant="outlined"
            margin="normal"
            required
            name="Duration"
            label="Duration"
            id="duration"
            //autoComplete="current-password"
            onChange = {e =>setDuration(e.target.value)}
          />
          <br/>
     
 
     <Button variant="contained" color="primary"   display = "flex" marginright onClick={handleSubmit}>Create</Button>


     

         

  </div>
);

  
  }