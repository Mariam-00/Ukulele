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

export default function Summary()
{  const[flight1,setFlight1]=useState([]);
   const[flight2,setFlight2]=useState([]);
   const id1=localStorage.getItem("selectedDepartureFlightId");
   const id2=localStorage.getItem("selectedReturnFlightId"); 
   const classes=useStyles();
   useEffect(()=>{
    axios.get('http://localhost:8000/flights/find/'+id1).then((response) => {
        setFlight1(response.data);
        
      });

    axios.get('http://localhost:8000/flights/find/'+id2).then((response) => {
        setFlight2(response.data);
      });  

    }, []);

    const handleContinue=(e)=>{
     if(localStorage.getItem("userId")===null)
     {
       window.location.href="/";
     }
     else
     {
       window.location.href="/confirm";
     }

    }
  
   
  
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
        <h1>Flight Summary</h1>
        <div >
            
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
              <b> Departure Flight's Date:{flight1.Date}</b> <br/>
              <b> Departure Flight's Departure Time: {flight1.DepartureTime}</b><br/>
              <b> Departure Flight's Arrival Time: {flight1.ArrivalTime}</b><br/>
              <b> Departure Flight's Cabin Class:{localStorage.getItem("class")}</b><br/>
              <b> Departure's Flight Duration:{flight1.Duration}</b><br/>
              {localStorage.getItem("class")==="Economy"?
              <b>Departure Flight's Price Per Passenger:{flight1.PriceEconomy}</b>:
              <b>Departure Flight's Price Per Passenger:{flight1.PriceBusiness}</b>}
              <br/>
              <b> Departure Flight's Seat Number: Seat Number Not Chosen Yet Please Check In To Choose It</b><br/>
              <b> Return Flight's Date:{flight2.Date} </b><br/>
              <b> Return Flight's Departure Time : {flight2.DepartureTime}</b><br/>
              <b> Return Flight's Arrival Time :{flight2.ArrivalTime}</b><br/>
              <b> Return Flight's Cabin Class:{localStorage.getItem("class")}</b><br/>
              <b> Return Flight's Duration:{flight2.Duration}</b><br/>
              {localStorage.getItem("class")==="Economy"?
              <b>Return Flight's Price Per Passenger:{flight2.PriceEconomy}</b>:
              <b>Return Flight's Price Per Passenger :{flight2.PriceBusiness}</b>}
              <br/>
              <b> Return Flight's Seat Number: Seat Number Not Chosen Yet Please Check In To Choose It</b><br/>
              {localStorage.getItem("class")==="Economy"?
                <b> Total Price :{(localStorage.getItem("NrPassengers")*flight1.PriceEconomy)+(localStorage.getItem("NrPassengers")*flight2.PriceEconomy)} </b>
                :
                <b> Total Price :{(localStorage.getItem("NrPassengers")*flight1.PriceBusiness)+(localStorage.getItem("NrPassengers")*flight2.PriceBusiness)} </b>
              }
           
                  
                 
                
              </div>
        
              <>
          
           {" "}

            
          

        </>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
         
            </Paper>
            <div>
            <Button variant="contained" color="primary"   display = "flex" marginright onClick={handleContinue}>Continue</Button>
            </div>
            
            
          
            
        </div>
        </div>
    );
}