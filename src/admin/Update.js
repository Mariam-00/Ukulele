import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {Link} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  CssBaseline,
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
export default function Update(props)
{   const classes = useStyles();
    const[flight,setFlight]=useState({});
    const handleSubmit = (e)=>{
        e.preventDefault();
        localStorage.setItem("test",props.match.params.id)
        localStorage.setItem("flightUpdate",flight)
        axios.put('http://localhost:8000/flights/update'+props.match.params.id,flight)
        .then(res => console.log(res.data))
        .then(
          ()=>{
            alert("Flight Updated!");
          })
    }
    const handleChange =(e)=>{
        setFlight({...flight,[e.target.name]:e.target.value});
    };

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
        <h2>Update Flight</h2>
        <TextField
          id="flightNr"
          label="Flight Number"
          name="FlightNumber"
         onChange={handleChange}
          margin="normal"
        />
        <br/>
        <TextField
          id="depTime"
          label="Departure Time"
          name="DepartureTime"
          onChange={handleChange}
          margin="normal"
        />
        <br/>
        <TextField
          id="arrTime"
          label="Arrival Time"
          name="ArrivalTime"
          onChange={handleChange}
          margin="normal"
        /><br/>
        <TextField
          id="date"
          label="Date"
          name="Date"
          onChange={handleChange}
          margin="normal"
        />
        <br/>
        <TextField
          id="nrEco"
          label="Number Of Economy Seats"
          name="NrEconomySeats"
         onChange={handleChange}
          margin="normal"
        />
        <br/>
        <TextField
          id="nrBusiness"
          label="NrBusinessSeats"
          name="NrBusinessSeats"
        onChange={handleChange}
          margin="normal"
        />
        <br/>
        
        <TextField
          id="departureAirport"
          label="Departure Airport"
          name="Departure Airport"
        onChange={handleChange}
          margin="normal"
        />

        <br/>
        <TextField
          id="arrivalAirport"
          label="Arrival Airport"
          name="Arrival Airport"
         onChange={handleChange}
          margin="normal"
        />
      

        <br/>
        <TextField
          id="duration"
          label="Duration"
          name="Duration"
        onChange={handleChange}
          margin="normal"
        />
        <br/>
        
         <div>
         <Button  variant="contained" color="primary" display = "flex"   marginright onClick={handleSubmit}>Update</Button>
              </div>
          <br/>
        
              </div>
               
            );
    
}