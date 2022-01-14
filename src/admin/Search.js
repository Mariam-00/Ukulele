import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

import axios from 'axios';
import Grid from '@material-ui/core/Grid';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
   this.state = {flightNumber:' ',departureTime:' ',arrivalTime:' ',date:' ',nrEconomySeats:' ',nrBusinessSeats:' ',arrivalAirport:' ',departureAirport:' ',Flights:{},duration:''}
  } 
  componentDidMount(){
    const flight = this.props.match.params.id;
  }
  
 
  handleSubmit =async e=>{
    e.preventDefault();
    let searchlink = "";
   if(this.state.flightNumber!== " ")
    searchlink+="FlightNumber="+ this.state.flightNumber +"&";
   
    if(this.state.departureTime!== " ")
    searchlink+="DepartureTime="+ this.state.departureTime +"&";

     if(this.state.arrivalTime!== " ")
     searchlink+="ArrivalTime="+ this.state.arrivalTime +"&";

     if(this.state.date!== " ")
     searchlink+="Date="+ this.state.date +"&";

     if(this.state.nrEconomySeats!== " ")
     searchlink+="NrEconomySeats="+ this.state.nrEconomySeats +"&";
     if(this.state.nrBusinessSeats!== " ")
     searchlink+="NrBusinessSeats="+ this.state.nrBusinessSeats +"&";
     if(this.state.arrivalAirport!== " ")
     searchlink+="ArrivalAirport="+ this.state.arrivalAirport +"&";
     if(this.state.departureAirport!== " ")
     searchlink+="DepartureAirport="+ this.state.departureAirport +"&";
     if(this.state.duration!== " ")
     searchlink+="Duration="+ this.state.duration +"&";
     
     searchlink= searchlink.substring(0,(searchlink.length-1));
     
     localStorage.setItem("f","f");
     localStorage.setItem("searchlink",searchlink);

     window.location.href="/list-search/"+searchlink;

    
}
handleChange = function(event) {
  this.setState({value: event.target.value});
  this.state.Flights={...this.state.Flights,[event.target.name]:[event.target.value]};
}
  render() {
    return(
      <div>
<h2>Search Flight</h2>;
<TextField
  id="flightNr"
  label="Flight Number"
  //value={this.state.flightNumber}
  onChange={e => this.state.flightNumber = e.target.value}
  margin="normal"
/>
<br/>
<TextField
  id="depTime"
  label="Departure Time"
 // value={this.state.name}
  onChange={e => this.state.departureTime = e.target.value}
  margin="normal"
/>
<br/>
<TextField
  id="arrTime"
  label="Arrival Time"
 // value={this.state.name}
  onChange={e => this.state.arrivalTime = e.target.value}
  margin="normal"
/><br/>
<TextField
  id="date"
  label="Date"
 // value={this.state.name}
  onChange={e => this.state.date = e.target.value}
  margin="normal"
/>
<br/>
<TextField
  id="nrEco"
  label="Number Of Economy Seats"
 // value={this.state.name}
  onChange={e => this.state.nrEconomySeats = e.target.value}
  margin="normal"
/>
<br/>
<TextField
  id="nrBusiness"
  label="Number Of Business Seats"
 // value={this.state.name}
  onChange={e => this.state.nrBusinessSeats= e.target.value}
  margin="normal"
/>
<br/>



<TextField
  id="departureAirport"
  label="Departure Airport"
 // value={this.state.name}
  onChange={e => this.state.departureAirport = e.target.value}
  margin="normal"
/>
<br/>
<TextField
  id="arrivalAirport"
  label="Arrival Airport"
 
  onChange={e => this.state.arrivalAirport = e.target.value}
  margin="normal"
/>
<br/>
<TextField
  id="duration"
  label="Duration"
 // value={this.state.name}
  onChange={e => this.state.duration = e.target.value}
  margin="normal"
/>
<br/>

 <div>
 <Button  variant="contained" color="primary" display = "flex"   marginright onClick={this.handleSubmit}>Search</Button>
      </div>
  <br/>

 </div>

           
           
 
     
     
       
    );
    
  }
}
