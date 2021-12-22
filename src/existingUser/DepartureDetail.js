import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';

export default function DepartureDetail(props)

{  const[flight,setFlights]=useState([]);
   const id=props.match.params.id;

  
    useEffect(()=>{
      axios.get('http://localhost:8000/flights/find/'+props.match.params.id).then((response) => {
          setFlights(response.data);
        });
      }, []);
  
    

  
    return(
        <div>
        <h1>Flight Details</h1>
        <div >
            
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
              <b> FlightNumber: {flight.FlightNumber}</b><br/>
                  Departure Time: {flight.DepartureTime}<br/>
                  Arrival Time: {flight.ArrivalTime}<br/>
                  {localStorage.getItem("economy")==1?
                  <p>Cabin Class:Economy</p>:
                 <p>Cabin Class:Business</p>}
                 <br/>
                   {localStorage.getItem("economy")==1?
                   <p> Baggage Allowance: Two 23 Kg Bags</p>:
                   <p> Baggage Allowance: Two 32 Kg Bags</p>}
                
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