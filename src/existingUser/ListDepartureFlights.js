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

export default function ListDepartureFlights(props)
{   
    const[flight,setFlight]=useState([]);
    const passengers=localStorage.getItem("NrPassengers");
    const searchLink=props.match.params.id;
    const[flight2,setFlight2]=useState([]);
    const classes = useStyles();
   
   
    useEffect(()=>{
        axios.get('http://localhost:8000/flights/search?'+searchLink).then((response) => {
            setFlight(response.data);
            localStorage.setItem("error","yes");
          });
         

        }, []);
    


    const handleSelectClick =(e)=>
    { e.preventDefault();
     const id=e.currentTarget.id;
     localStorage.setItem("selectedDepartureFlightId",id);
    
     window.location.href="/list-ret/"; 
     };
    const handleDetailstClick =(e)=>
    { 
     e.preventDefault();
     window.location.href="/dep-det/"+e.currentTarget.id;
    };

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
        <h1>Choose A Departure Flight</h1>
        <div >
            
            {flight.map(flight=>(
                <div>
           { (localStorage.getItem("economy")==1) && (flight.NrEconomySeats>passengers)? 
           <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
            
              <div class="wrapper">
                 
             <b> FlightNumber: {flight.FlightNumber}<br/></b>
              DepartureTime: {flight.DepartureTime}<br/>
              ArrivalTime: {flight.ArrivalTime}<br/>
              Date: {flight.Date}<br/>
              Price:{flight.PriceEconomy}
              {localStorage.setItem("Price",flight.PriceEconomy)}
              
             
             </div> 
               
                 
             <div>
             <Button variant="contained" color="primary" id={flight._id}  display = "flex" marginright onClick={handleSelectClick}>Select</Button>
             <Button variant="contained" color="primary" id={flight._id}  display = "flex" marginright onClick={handleDetailstClick}>See Details</Button>
            </div>    
             
                       
              
        
              <>
            
           {" "}
            
           
        </>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
            </Paper>
          
       :(localStorage.getItem("business")==1) && (flight.NrBusinessSeats>passengers)?(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
            
              <div class="wrapper">
                 
             <b> FlightNumber: {flight.FlightNumber}<br/></b>
              DepartureTime: {flight.DepartureTime}<br/>
              ArrivalTime: {flight.ArrivalTime}<br/>
              Date: {flight.Date}<br/>
              Price:{flight.PriceBusiness}
             </div> 
               
                 
             <div>
             <Button variant="contained" color="primary" id={flight._id}  display = "flex" marginright onClick={handleSelectClick}>Select</Button>
             <Button variant="contained" color="primary" id={flight._id}  display = "flex" marginright onClick={handleDetailstClick}>See Details</Button>
            </div>    
             
                       
              
        
              <>
            
           {" "}
            
           
        </>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
            </Paper>  
       ):(<div></div>)}

         </div>
            ))
          } 
             
            
        </div>
  
        </div>
    );
    
}