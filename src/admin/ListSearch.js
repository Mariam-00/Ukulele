import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';
export default class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state={Flights:[]}
  }
  
  componentDidMount()
{   const searchlink=this.props.match.params.id;
    localStorage.setItem("bom",searchlink);
    axios.get('http://localhost:8000/flights/search?'+searchlink).then((response) => {
       this.setState({Flights:response.data});
       localStorage.setItem("f","f"); 
      });
     
  }
  
 
  

  render() {
    return(
     
    <div>
     {this.state.Flights.map(flight=>(
     <Grid container justifyContent="space-between" alignItems="center">
     <Grid item xl>
       <div class="wrapper">
       <b>FlightNumber: {flight.FlightNumber}</b><br/>
           DepartureTime: {flight.DepartureTime}<br/><b/>
           ArrivalTime: {flight.ArrivalTime}<br/><b/>
           Date: {flight.Date}<br/><b/>
           NrEconomySeats: {flight.NrEconomySeats}<br/><b/>
           NrBusinessSeats: {flight.NrBusinessSeats}<br/><b/>
           DepartureAirport:{flight.DepartureAirport}<br/><b/>
           ArrivalAirport: {flight.ArrivalAirport}<br/><b/>
           Duration:{flight.Duration}<br/><b/>
          
       </div>

    
     </Grid>
     <Grid item>
     </Grid>
   </Grid>
  
     
     
     ))
     } 
      {/* <div >
       <Button variant="contained" color="primary" id={localStorage.getItem("email")} display = "flex" marginright onClick={handleOrderClick}>View My Orders</Button>
     </div> */}
     
 
 </div>
           
           
 
     
     
       
    );
    
  }
}