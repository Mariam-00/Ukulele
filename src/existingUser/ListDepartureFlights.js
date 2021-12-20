import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';
export default function ListDepartureFlights(props)
{  const economy=localStorage.getItem("economy");
    const[flight,setFlight]=useState([]);
    const passengers=localStorage.getItem("NrPassengers");
    const searchLink=props.match.params.id;
    useEffect(()=>{
        axios.get('http://localhost:8000/flights/search?'+searchLink).then((response) => {
            setFlight(response.data);
          });

        }, []);
    

   
   
    const handleConfirm =(e)=>{
        
    };
    const handleSelectClick =(e)=>
    {
      localStorage.setItem("selectedDepartureFlight",e.currentTarget.id)
    };
    const handleDetailstClick =(e)=>
    {
     // go to page of flight details
    };

    return(
        
        <div>
        <h1>Choose A Departure Flight</h1>
        <div >
            
            {flight.map(flight=>(
                <div>
           {   economy && flight.NrEconomySeats>passengers ? 
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
               
                 
             <div>
             <Button variant="contained" color="primary" id={flight._id}  display = "flex" marginright onClick={handleSelectClick}>Select</Button>
             <Button variant="contained" color="primary" id={flight._id}  display = "flex" marginright onClick={handleDetailstClick}>See Details</Button>
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
          
       :!economy && flight.NrBusinessSeats>passengers?
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
       {/* <div marginRight>
         <Button variant="contained" color="primary" id={restr.id}  display = "flex" marginright onClick={handleMenuClick}>Menu</Button>
       </div> */}
       </Grid>
     </Grid>
    
       </Paper>
    :<div></div> }
                </div>
            ))
          } 
             
            
        </div>
        </div>
    );
    
}