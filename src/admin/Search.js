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
   this.state = {flightNumber:' ',departureTime:' ',arrivalTime:' ',date:' ',nrEconomySeats:' ',nrBusinessSeats:' ',arrivalAirport:' ',departureAirport:' ',Flights:{}}
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
     if(this.state.arrivalAirport!= " ")
     searchlink+="Airport="+ this.state.arrivalAirport +"&";
     if(this.state.departureAirport!= " ")
     searchlink+="Airport="+ this.state.departureAirport +"&";
     
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
  id="arrivalAirport"
  label="Arrival Airport"
 // value={this.state.name}
  onChange={e => this.state.arrivalAirport = e.target.value}
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

 <div>
 <Button  variant="contained" color="primary" display = "flex"   marginright onClick={this.handleSubmit}>Search</Button>
      </div>
  <br/>
 
     {/* <div >
     {this.state.Flights.map(flight=>(
     <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
     <Grid container justifyContent="space-between" alignItems="center">
     <Grid item xl>
       <div class="wrapper">
       <b>FlightNumber: {flight.FlightNumber}</b><br/>
           DepartureTime: {flight.DepartureTime}<br/>
           ArrivalTime: {flight.ArrivalTime}<br/>
           Date: {flight.Date}<br/>
           NrEconomySeats: {flight.NrEconomySeats}<br/>
           NrBusinessSeats: {flight.NrBusinessSeats}<br/>
           Airport: {flight.Airport}
       </div>
   
     
    
     </Grid>
     <Grid item>
     {/* <div marginRight>
       <Button variant="contained" color="primary" id={restr.id}  display = "flex" marginright onClick={handleMenuClick}>Menu</Button>
     </div> */}
     
      {/* <div >
       <Button variant="contained" color="primary" id={localStorage.getItem("email")} display = "flex" marginright onClick={handleOrderClick}>View My Orders</Button>
     </div> */}
     
 </div>

           
           
 
     
     
       
    );
    
  }
}
