import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
export default class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
   this.state = {flightNumber:' ',departureTime:' ',arrivalTime:' ',date:' ',nrEconomySeats:' ',nrBusinessSeats:' ',airport:' '}
  } 
  componentDidMount(){
    const flight = this.props.match.params.id;
    //localStorage.setItem("flight_id",flightId)
  }
  
 
  handleSubmit =async e=>{
    e.preventDefault();
   if(this.state.flightNumber== " ")
    this.state.flightNumber= this.props.match.params.id.FlightNumber;
  
    if(this.state.departureTime== " ")
     this.state.departureTime=this.props.match.params.id.DepartureTime;
     if(this.state.arrivalTime== " ")
     this.state.arrivalTime=this.props.match.params.id.ArrivalTime;
     if(this.state.date== " ")
     this.state.date=this.props.match.params.id.Date;
     if(this.state.nrEconomySeats== " ")
     this.state.nrEconomySeats=this.props.match.params.id.nrEconomySeats;
     if(this.state.nrBusinessSeats== " ")
     this.state.nrBusinessSeats=this.props.match.params.id.nrBusinessSeats;
     if(this.state.airport== " ")
     this.state.airport=this.props.match.params.id.airport;



   

   const Flight={FlightNumber:this.state.flightNumber,DepartureTime:this.state.departureTime,ArrivalTime:this.state.arrivalTime,NrEconomySeats:this.state.nrEconomySeats,NrBusinessSeats:this.state.nrBusinessSeats,Airport:this.state.airport}
    axios.put('http://localhost:8000/flights/update'+this.props.match.params.id,Flight)
        .then(res => console.log(res.data))
        .then(
          ()=>{
            alert("Flight Updated!");
          })
 
   
    
}
handleChange = function(event) {
  this.setState({value: event.target.value});
}
  render() {
    return(
      <div>
<h2>Update Flight</h2>;
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
  id="airport"
  label="Airport Name"
 // value={this.state.name}
  onChange={e => this.state.airport = e.target.value}
  margin="normal"
/>
<br/>

 <div>
 <Button  variant="contained" color="primary" display = "flex"   marginright onClick={this.handleSubmit}>Update</Button>
      </div>
  <br/>

      </div>
       
    );
  }
}
