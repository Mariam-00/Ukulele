import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  withMobileDialog,
  Paper,
} from "@material-ui/core";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ListSearch (props) {
  // constructor(props) {
  //   super(props);
  //   this.componentDidMount = this.componentDidMount.bind(this);
  //   this.state={Flights:[]}
  // }
  
  const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
  }))
  const classes = useStyles();
  const[Flights,setFlights]=useState([]); 
  useEffect(()=>{
    const searchlink=props.match.params.id;
    console.log("searchLink",searchlink);
    axios.get('http://localhost:8000/flights/search?'+searchlink).then((response) => {
      setFlights(response.data);
      
       localStorage.setItem("f","f"); 
      });
    }, []);
//   componentDidMount()
// {   const searchlink=props.match.params.id;
//     localStorage.setItem("bom",searchlink);
//     axios.get('http://localhost:8000/flights/search?'+searchlink).then((response) => {
//       setFlights(response.data);
//       // this.setState({Flights:response.data});
//        localStorage.setItem("f","f"); 
//       });
     
//   }
  
 
  


    return(
     
    <div>
        <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
           FlyFast
          </Typography>
            <div className={classes.navlinks}>
              <Link to={"/create-flights"} className={classes.link}>
                Create A Flight
              </Link>
              <Link to={"/list-flights"} className={classes.link}>
                List All Flights
              </Link>
              <Link to={"/search-flights"} className={classes.link}>
               Search For A Flight
              </Link>
            
            </div>
        </Toolbar>
      </AppBar>
  
      <br/>
      <br/>
      <h1>Available Flights</h1>
      {Flights.map(flight=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
              <b>FlightNumber: {flight.FlightNumber}</b><br/>
               <b> DepartureTime: {flight.DepartureTime}<br/></b>
                  ArrivalTime: {flight.ArrivalTime}<br/><b/>
                  Date: {flight.Date}<br/><b/>
                  NrEconomySeats: {flight.NrEconomySeats}<br/><b/>
                  NrBusinessSeats: {flight.NrBusinessSeats}<br/><b/>
                  DepartureAirport: {flight.DepartureAirport}<br/><b/>
                  ArrivalAirport:{flight.ArrivalAirport}<br/><b/>
                  PriceEconomy:{flight.PriceEconomy}<br/><b/>
                  PriceBusiness:{flight.PriceBusiness}<br/><b/>
                  Duration:{flight.Duration}<br/><b/>

              </div>
        
              <>
           {" "}

        </>
            </Grid>
            <Grid item>
    
            </Grid>
          </Grid>
         
            </Paper>
            
            
            ))
            } 
      {/* <div >
       <Button variant="contained" color="primary" id={localStorage.getItem("email")} display = "flex" marginright onClick={handleOrderClick}>View My Orders</Button>
     </div> */}
     
 
 </div>
           
           
 
     
     
       
    );
    
  
}