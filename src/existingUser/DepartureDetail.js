import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';

export default function DepartureDetail(props)
{  const[flight,setFlights]=useState([]);
const[baggage,setBaggage]=useState();
const[cabin,setCabin]=useState();
   const id=props.match.params.id;
   useEffect(()=>{
    axios.get('http://localhost:8000/flights/find/'+id).then((response) => {
        setFlights(response.data);
        });
   })
   
  const getEconomy =()=>
   {
       if(localStorage.getItem("economy")==="true")
       {
          setBaggage(2);   
          setCabin("Economy");

       }
       else
       {
        setBaggage(3);   
        setCabin("Business"); 
       }
   }
    return(
        <div>
        <h1>Flight Details</h1>
        <div >
            {flight.map(flight=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
              <b>FlightNumber: {flight.FlightNumber}</b><br/>
                  Departure Time: {flight.DepartureTime}<br/>
                  Arrival Time: {flight.ArrivalTime}<br/>
                  Cabin Class:{cabin}<br/>
                  Baggage Allowance: {baggage}<br/> 
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
            
            
            ))
            } 
             {/* <div >
              <Button variant="contained" color="primary" id={localStorage.getItem("email")} display = "flex" marginright onClick={handleOrderClick}>View My Orders</Button>
            </div> */}
            
        </div>
        </div>
    );
}