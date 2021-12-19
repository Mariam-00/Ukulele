import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';
export default function ListDepartureFlights(props)
{ 
    const[flight,setFlight]=useState({});
    const[toggle,setToggle]=useState(true);
    

    const searchLink=props.match.params.id;
    const handleSubmit = (e)=>{
        e.preventDefault();
        localStorage.setItem("test",props.match.params.id);
        localStorage.setItem("flightUpdate",flight);
        localStorage.setItem("economy","true");
        localStorage.setItem("nrpassengers",4)
        axios.get('http://localhost:8000/flights/search?'+searchLink).then((response) => {
           setFlight(response.data);
           
            
           
           });
    }
    const handleChange =(e)=>{
        setFlight({...flight,[e.target.name]:e.target.value});
    };

    return(
        
       <div>
        <h1>Available Flights</h1>
        <div >
            {flight.map(flight=>(
                <div>
              { localStorage.getItem("economy")=== "true" && flight.nrEconomySeats>localStorage.getItem("nrPassengers") ?(
            
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
               
              <div class="wrapper">
             <b> FlightNumber: {flight.FlightNumber}<br/></b>
              DepartureTime: {flight.DepartureTime}<br/>
              ArrivalTime: {flight.ArrivalTime}<br/>
              Date: {flight.Date}<br/>
              Price:{flight.PriceEconomy}
             </div> 
               
                 
                 
             
             
              
        
              <>
            
           {" "}
            
           
        </>
            </Grid>
            <Grid item>
            {/* <div marginRight>
              <Button variant="contained" color="primary" id={restr.id}  display = "flex" marginright onClick={handleMenuClick}>Menu</Button>
            </div> */}
            </Grid>
          </Grid>
         
            </Paper>
           ) : localStorage.getItem("economy")==="false" && flight.nrEconomySeats>localStorage.getItem("nrPassengers") (
                <div>
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
               
                 
                 
             
             
              
        
              <>
            
           {" "}
            
           
        </>
            </Grid>
            <Grid item>
            {/* <div marginRight>
              <Button variant="contained" color="primary" id={restr.id}  display = "flex" marginright onClick={handleMenuClick}>Menu</Button>
            </div> */}
            </Grid>
          </Grid>
         
            </Paper>
                </div>
                )}
                </div>
            ))
          } 
             
            
        </div>
        </div>
    );
    
}