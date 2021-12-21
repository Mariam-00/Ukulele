import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';
export default function ListDepartureFlights(props)
{  const [economy,setEconomy]=useState(false);
    const[business,setBusiness]=useState(false);
    const[flight,setFlight]=useState([]);
    const economy2=localStorage.getItem("economy");
    const passengers=localStorage.getItem("NrPassengers");
    const searchLink=props.match.params.id;
    useEffect(()=>{
        axios.get('http://localhost:8000/flights/search?'+searchLink).then((response) => {
            setFlight(response.data);
          });
         

        }, []);
    


    const handleSelectClick =(e)=>
    {   localStorage.setItem("selectedDepartureFlightId",e.currentTarget.id);
        if(localStorage.getItem("oneWay")===true)
        {
            //window.location.href="";
        }
        else{
            window.location.href="/list-ret/";
        }
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
            {/* <div marginRight>
              <Button variant="contained" color="primary" id={restr.id}  display = "flex" marginright onClick={handleMenuClick}>Menu</Button>
            </div> */}
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