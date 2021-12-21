import React, { useEffect, useState } from 'react';
import { Container, Paper, Button } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';


export default function ListReturnFlights() {
    //const economy = localStorage.getItem("economy");
    const [flight, setFlight] = useState([]);
    const passengers = localStorage.getItem("NrPassengers");
    const searchLink = localStorage.getItem("searchlinkreturn");
    useEffect(() => {
        axios.get('http://localhost:8000/flights/search?' + searchLink).then((response) => {
            setFlight(response.data);
        });

    }, []);

    
    const handleSelectClick =(e)=>
    {
      localStorage.setItem("selectedReturnFlight",e.currentTarget.id)
    };
    const handleDetailstClick =(e)=>
    {
     // go to page of flight details
    };





return (

   
    <div>
    <h1>Choose A Return Flight</h1>
    <div >
        
        {flight.map(flight=>(
            <div>
       { (localStorage.getItem("economy")==1) && (flight.NrEconomySeats>passengers) ? 
       <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
        <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xl>
        
          <div class="wrapper">
             
         <b> FlightNumber: {flight.FlightNumber}<br/></b>
          DepartureTime: {flight.DepartureTime}<br/>
          ArrivalTime: {flight.ArrivalTime}<br/>
          Date: {flight.Date}<br/>
          Price:{flight.PriceEconomy}
          {localStorage.setItem("returnFlightPrice",flight.PriceEconomy)}
         
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
          {localStorage.setItem("returnFlightPrice",flight.PriceEconomy)}
         
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