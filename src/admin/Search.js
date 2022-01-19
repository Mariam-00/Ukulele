import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper} from '@material-ui/core';
import {Link} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Button,
  Typography,
  withMobileDialog,
} from "@material-ui/core";

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


export default function Search () {
 
 
  const [flightNumber,setFlightNumber]=useState(" ");
  const[departureTime,setDepartureTime]=useState(" ");
  const[arrivalTime,setArrivalTime]=useState(" ");
  const[date,setDate]=useState(" ");
  const[nrEconomySeats,setNrEconomySeats]=useState(" ");
  const[nrBusinessSeats,setNrBusinessSeats]=useState(" ");
  const[arrivalAirport,setArrivalAirport]=useState(" ");
  const[departureAirport,setDepartureAirport]=useState(" ");
  const [Flights,setFlights]=useState({});
  const[duration,setDuration]=useState(" ");
  const classes=useStyles();
 
 const handleSubmit =async e=>{
    e.preventDefault();
    let searchlink = "";
   if(flightNumber!== " ")
    searchlink+="FlightNumber="+ flightNumber +"&";
   
    if(departureTime!== " ")
    searchlink+="DepartureTime="+ departureTime +"&";

     if(arrivalTime!== " ")
     searchlink+="ArrivalTime="+arrivalTime +"&";

     if(date!== " ")
     searchlink+="Date="+ date +"&";

     if(nrEconomySeats!== " ")
     searchlink+="NrEconomySeats="+ nrEconomySeats +"&";
     if(nrBusinessSeats!== " ")
     searchlink+="NrBusinessSeats="+nrBusinessSeats +"&";
     if(arrivalAirport!== " ")
     searchlink+="ArrivalAirport="+ arrivalAirport +"&";
     if(departureAirport!== " ")
     searchlink+="DepartureAirport="+ departureAirport +"&";

     if(duration!== " ")
     searchlink+="Duration="+ duration +"&";
     
     searchlink= searchlink.substring(0,(searchlink.length-1));
     
     localStorage.setItem("f","f");
     localStorage.setItem("searchlink",searchlink);

     window.location.href="/list-search/"+searchlink;

    
}
// handleChange = function(event) {
//   this.setState({value: event.target.value});
//   this.state.Flights={...this.state.Flights,[event.target.name]:[event.target.value]};
// }
 

    return(
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
<h2>Search Flight</h2>
<TextField
  id="flightNr"
  label="Flight Number"
  //value={this.state.flightNumber}
  onChange={e => setFlightNumber(e.target.value)}
  margin="normal"
/>
<br/>
<TextField
  id="depTime"
  label="Departure Time"
 // value={this.state.name}
  onChange={e => setDepartureTime(e.target.value)}
  margin="normal"
/>
<br/>
<TextField
  id="arrTime"
  label="Arrival Time"
 // value={this.state.name}
  onChange={e => setArrivalTime(e.target.value)}
  margin="normal"
/><br/>
<TextField
  id="date"
  label="Date"
 // value={this.state.name}
  onChange={e => setDate(e.target.value)}
  margin="normal"
/>
<br/>
<TextField
  id="nrEco"
  label="Number Of Economy Seats"
 // value={this.state.name}
  onChange={e => setNrEconomySeats(e.target.value)}
  margin="normal"
/>
<br/>
<TextField
  id="nrBusiness"
  label="Number Of Business Seats"
 // value={this.state.name}
  onChange={e => setNrBusinessSeats(e.target.value)}
  margin="normal"
/>
<br/>



<TextField
  id="departureAirport"
  label="Departure Airport"
 // value={this.state.name}
  onChange={e => setDepartureAirport(e.target.value)}
  margin="normal"
/>
<br/>
<TextField
  id="arrivalAirport"
  label="Arrival Airport"
 
  onChange={e => setArrivalAirport (e.target.value)}
  margin="normal"
/>
<br/>
<TextField
  id="duration"
  label="Duration"
 // value={this.state.name}
  onChange={e => setDuration (e.target.value)}
  margin="normal"
/>
<br/>

 <div>
 <Button  variant="contained" color="primary" display = "flex"   marginright onClick={handleSubmit}>Search</Button>
      </div>
  <br/>

 </div>

           
           
 
     
     
       
    );
    
  
} 
