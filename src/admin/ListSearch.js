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
           DepartureTime: {flight.DepartureTime}<br/>
           ArrivalTime: {flight.ArrivalTime}<br/>
           Date: {flight.Date}<br/>
           NrEconomySeats: {flight.NrEconomySeats}<br/>
           NrBusinessSeats: {flight.NrBusinessSeats}<br/>
           Airport: {flight.Airport}
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