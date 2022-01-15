import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper,Button} from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  withMobileDialog,
} from "@material-ui/core";

import axios from 'axios';
import Grid from '@material-ui/core/Grid';

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

export default function SearchForFlight() {
    const classes = useStyles();
  const [depDate,setDepDate]=useState();
  const[value,setValue]=useState();
 
  
 const handleChange =(e)=>
 {
    if(e.target.value==="Business")
    {
      localStorage.setItem("economy",0);
      localStorage.setItem("business",1);
      localStorage.setItem("class","Business")
      setValue("Business");
    }
    else{
        localStorage.setItem("economy",1);
        localStorage.setItem("business",0);
        localStorage.setItem("class","Economy");
        setValue("Economy");
    }
 }
 const handleSubmit =async e=>{
    e.preventDefault();
    const res=localStorage.getItem("depFlightResId");
    console.log(res);
    axios.get('http://localhost:8000/reservations/'+res).then((response) => {
       
    let searchlink = "";
    localStorage.setItem("oneWay",1);
    searchlink+="DepartureAirport="+response.data.FlightDep.DepartureAirport+"&"+"ArrivalAirport="+response.data.FlightDep.ArrivalAirport+"&"+"Date="+depDate;
    
    window.location.href="/onewaydep/"+searchlink;
        
    })
    

    
}

 
    return(
      <div>
          <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
           FlyFast
          </Typography>
            <div className={classes.navlinks}>
              <Link to={"/user/"+ localStorage.getItem("userId")} className={classes.link}>
                Profile
              </Link>
              <Link to= {"/bookings/"+ localStorage.getItem("userId")} className={classes.link}>
                My Bookings
              </Link>
              <Link to={"/book/"+ localStorage.getItem("userId")} className={classes.link}>
                Book A Flight
              </Link>
              <Link to="/home" className={classes.link}>
                Sign Out
              </Link>
            </div>
        </Toolbar>
      </AppBar>
<h2>Search For A Departure Flight</h2>;
<TextField
  id="depDate"
  label="Departure Date"
  //value={this.state.flightNumber}
  onChange={e => setDepDate(e.target.value)}
  margin="normal"
/>
<br/>
{ <FormControl component="fieldset">
                    <FormLabel component="Class"></FormLabel>
                    <RadioGroup
                        aria-label="Class"
                        name="controlled-radio-buttons-group"
                        value={value}
                        
                    >
                        <FormControlLabel value="Business" control={<Radio />} label="Business" onChange={handleChange}/>
                        <FormControlLabel value="Economy" control={<Radio />} label="Economy"onChange={handleChange} />
                      

                    </RadioGroup>
                </FormControl> }





<br/>

 <div>
 <Button  variant="contained" color="primary" display = "flex"   marginright onClick={handleSubmit}>Search</Button>
      </div>
  <br/>

 </div>
);
    
 
}
