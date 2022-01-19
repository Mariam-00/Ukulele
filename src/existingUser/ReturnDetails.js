import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  makeStyles,
  Typography,
  Toolbar,
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

export default function ReturnDetails(props)

{  const[flight,setFlights]=useState([]);
   const id=props.match.params.id;
   const classes=useStyles();
  
    useEffect(()=>{
      axios.get('http://localhost:8000/flights/find/'+props.match.params.id).then((response) => {
          setFlights(response.data);
        });
      }, []);
  
      localStorage.setItem("returnFlightDepartureTime",flight.DepartureTime);
      localStorage.setItem("returnFlightArrivalTime",flight.ArrivalTime);

  
    return(
        <div>
           {
               (localStorage.getItem("userId")==null)?
               <AppBar position="static">
               <CssBaseline />
               <Toolbar>
                 <Typography variant="h4" className={classes.logo} style={{textAlign:"left"}}>
                  FlyFast
                 </Typography>
               </Toolbar>
             </AppBar>
             :(localStorage.getItem("userId")!==null)?
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
                   <Link to={"/bookings/"+ localStorage.getItem("userId")} className={classes.link}>
                     My Bookings
                   </Link>
                   <Link to={"/search-available"} className={classes.link}>
                     Book A Flight
                   </Link>
                   <Link to="/" className={classes.link}>
                     Sign Out
                   </Link>
                 </div>
             </Toolbar>
           </AppBar>
           
             :(<div></div>)
           } 
           <br/>
           <br/>
        <h1>Flight Details</h1>
        <div >
            
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
              <b> FlightNumber: {flight.FlightNumber}</b><br/>
               <b>   Departure Time: {flight.DepartureTime}<br/></b>
                <b>  Arrival Time: {flight.ArrivalTime}<br/></b>
                <b>  Duration:{flight.Duration}<br/></b>
                  {localStorage.getItem("economy")==1?
                  <b>Cabin Class:Economy</b>:
                 <b>Cabin Class:Business</b>}
                 <br/>
                   {localStorage.getItem("economy")==1?
                   <b> Baggage Allowance: Two 23 Kg Bags</b>:
                   <b> Baggage Allowance: Two 32 Kg Bags</b>}
                
              </div>
        
              <>
          
           {" "}

            
          

        </>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
         
            </Paper>
            
            
          
            
        </div>
        </div>
    );
}