import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';

export default function Summary()
{  const[flight1,setFlight1]=useState([]);
   const[flight2,setFlight2]=useState([]);
   const id1=localStorage.getItem("selectedDepartureFlightId");
   const id2=localStorage.getItem("selectedReturnFlightId"); 
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
              {localStorage.getItem("class")==="Economy"?
              <b>Departure Flight's Price:{flight1.PriceEconomy}</b>:
              <b>Departure Flight's Price:{flight1.PriceBusiness}</b>}
              <br/>
              <b> Departure Flight's Seat Number: Seat Number Not Chosen Yet Please Check In To Choose It</b><br/>
              <b> Return Flight's Date:{flight2.Date} </b><br/>
              <b> Return Flight's Departure Time : {flight2.DepartureTime}</b><br/>
              <b> Return Flight's Arrival Time :{flight2.ArrivalTime}</b><br/>
              <b> Return Flight's Cabin Class:{localStorage.getItem("class")}</b><br/>
              {localStorage.getItem("class")==="Economy"?
              <b>Return Flight's Price:{flight2.PriceEconomy}</b>:
              <b>Return Flight's Price:{flight2.PriceBusiness}</b>}
              <br/>
              <b> Return Flight's Seat Number: Seat Number Not Chosen Yet Please Check In To Choose It</b><br/>
              {localStorage.getItem("class")==="Economy"?
                <b> Total Price :{flight1.PriceEconomy+flight2.PriceEconomy} </b>
                :
                <b> Total Price :{(flight1.PriceBusiness)+(flight2.PriceBusiness)} </b>
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