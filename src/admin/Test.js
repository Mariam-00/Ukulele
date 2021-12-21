import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
export default function Test(props)
{ 
    const[flight,setFlight]=useState({});
    const handleSubmit = (e)=>{
        e.preventDefault();
        localStorage.setItem("test",props.match.params.id)
        localStorage.setItem("flightUpdate",flight)
        axios.put('http://localhost:8000/flights/update'+props.match.params.id,flight)
        .then(res => console.log(res.data))
        .then(
          ()=>{
            alert("Flight Updated!");
          })
    }
    const handleChange =(e)=>{
        setFlight({...flight,[e.target.name]:e.target.value});
    };

    return(
        <div>
        <h2>Update Flight</h2>;
        <TextField
          id="flightNr"
          label="Flight Number"
          name="FlightNumber"
          //value={this.state.flightNumber}
         onChange={handleChange}
          margin="normal"
        />
        <br/>
        <TextField
          id="depTime"
          label="Departure Time"
          name="DepartureTime"
         // value={this.state.name}
          onChange={handleChange}
          margin="normal"
        />
        <br/>
        <TextField
          id="arrTime"
          label="Arrival Time"
          name="ArrivalTime"
         // value={this.state.name}
          onChange={handleChange}
          margin="normal"
        /><br/>
        <TextField
          id="date"
          label="Date"
          name="Date"
         // value={this.state.name}
          onChange={handleChange}
          margin="normal"
        />
        <br/>
        <TextField
          id="nrEco"
          label="Number Of Economy Seats"
          name="NrEconomySeats"
         // value={this.state.name}
         onChange={handleChange}
          margin="normal"
        />
        <br/>
        <TextField
          id="nrBusiness"
          label="NrBusinessSeats"
          name="NrBusinessSeats"
         // value={this.state.name}
        onChange={handleChange}
          margin="normal"
        />
        <br/>
        
        <TextField
          id="arrivalAirport"
          label="Arrival Airport"
          name="Arrival Airport"
         // value={this.state.name}
        onChange={handleChange}
          margin="normal"
        />
        <br/>

        <TextField
          id="departureAirport"
          label="Departure Airport"
          name="Departure Airport"
         // value={this.state.name}
        onChange={handleChange}
          margin="normal"
        />
        <br/>
        
         <div>
         <Button  variant="contained" color="primary" display = "flex"   marginright onClick={handleSubmit}>Update</Button>
              </div>
          <br/>
        
              </div>
               
            );
    
}