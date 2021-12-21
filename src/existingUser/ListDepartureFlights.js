import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';
export default function ListDepartureFlights(props)
{   
    const[flight,setFlight]=useState([]);
    const passengers=localStorage.getItem("NrPassengers");
    const searchLink=props.match.params.id;
    useEffect(()=>{
        axios.get('http://localhost:8000/flights/search?'+searchLink).then((response) => {
            setFlight(response.data);
          });
         

        }, []);
    


    const handleSelectClick =(e)=>
    {
     localStorage.setItem("selectedDepartureFlightId",e.currentTarget.id);
     axios.get('http://localhost:8000/flights/find/'+e.currentTarget.id).then((response) => {
      localStorage.setItem("departureFlightPrice",response.data.PriceEconomy);
      localStorage.setItem("entered",true);
    });


    //localStorage.setItem("flight2",flight2.length);
    // if(localStorage.getItem("economy")==1){
    // localStorage.setItem("departureFlightPrice",flight2.PriceEconomy);
    //  }
    // else if(localStorage.getItem("business")==1)
    // {
    //   localStorage.setItem("departureFlightPrice",flight2.PriceBusiness);
    // }
    // localStorage.setItem("departureFlightDepartureTime",flight2.DepartureTime);
    // localStorage.setItem("departureFlightArrivalTime",flight2.ArrivalTime);
    window.location.href="/list-ret/";
     };
    const handleDetailstClick =(e)=>
    {
     window.location.href="/dep-det/"+e.currentTarget.id;
    };

    return(
        
        <div>
        <h1>Choose A Departure Flight</h1>
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