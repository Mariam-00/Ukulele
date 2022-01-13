import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    AppBar,
    Toolbar,
    CssBaseline,
    Paper,
    Grid,
    Button,
    Typography,
    makeStyles,
    withMobileDialog,
  } from "@material-ui/core";
  import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { getAccordionSummaryUtilityClass } from '@mui/material';

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
   
export default function MyBookings (props)
{   const classes = useStyles();
    const[user,setUser]=useState();
    const[reservations,setReservations]=useState([]);
    const[depFlight, setDepFlight]=useState([]);
    const[retFlight,setRetFlight]=useState([]);
    const[depRetFlight,setDepRetFlight]=useState([]);
    var arraytry =[];
    var arrays =[];
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          backgroundColor       : '#FFFFFF'      
        }
    }; 


    useEffect(()=>{
        axios.get('http://localhost:8000/reservations/search?userId='+localStorage.getItem("userId")).then((response) => {
          setReservations(response.data);
          });
        
       
         }, []);
     
    

       const handleClickYesDelete = async e=>{
        e.preventDefault();
      console.log(e.currentTarget.id);
        axios.delete('http://localhost:8000/reservations/delete/'+e.currentTarget.id)
  .then(() => {
    alert("Flight deleted!");
    window.location.href = "/bookings/"+ props.match.params.id;
  });
    }
 const handleCheckIn = async e=>{
        e.preventDefault();
       const res=e.currentTarget.id;

       axios.get('http://localhost:8000/reservations/'+res).then((response) => {
           if (response.data.CheckedIn===0) {
             localStorage.setItem("reservationIdCheckIn",res);
             window.location.href="/checkIn/"+props.match.params.id;}
        else{
               alert("You Are Already Checked in to this flight!");
        }
           
         
       });
       
    }    

const [modalIsOpen,setModalIsOpen] = useState(false);

const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

  
     
    return (
      <div>
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
           FlyFast
          </Typography>
            <div className={classes.navlinks}>
              <Link to={"/user/"+ localStorage.getItem("userId")} className={classes.link}>
                Profile
              </Link>
              <Link to={"/bookings/"+ props.match.params.id} className={classes.link}>
                My Bookings
              </Link>
              <Link to={"/search-available"} className={classes.link}>
                Book A Flight
              </Link>
              <Link to="/look-flight" className={classes.link}>
                Search For A Flight
              </Link>
              <Link to="/home" className={classes.link}>
                Sign Out
              </Link>
            </div>
        </Toolbar>
      </AppBar>
      
      {reservations.map((reservation)=>(
        <div>
          <div>
         <div>
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper"></div>
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
            <b> Departure Flight</b><br/>
                 Departure Flight Number: {reservation.FlightDep.FlightNumber}<br/>
                  Date: {reservation.FlightDep.Date}<br/>
                  Departure Time:{reservation.FlightDep. DepartureTime}<br/>
                  Arrival Time:{reservation.FlightDep. ArrivalTime}<br/>
                  Seats: {reservation.FlightDep.DepartureseatNrs}<br/>
                  
                  Number of Passengers: {reservation.NrPassengers}<br/>
                  Class: {reservation.EconomyorBusiness==1? "Economy":"Business"}<br/>
                  Baggage: {reservation.EconomyorBusiness==1? "Two 23 KG Bags":"Two 32 KG Bags"}<br/>
                  </div>
             
            </Grid>
            <Grid item>
    
            </Grid>
          </Grid>
         
            </Paper>
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
              <b> Return Flight</b><br/>
Return Flight Number: {reservation.FlightRet.FlightNumber}<br/>
Date: {reservation.FlightRet.Date}<br/>
Departure Time:{reservation.FlightRet. DepartureTime}<br/> 
Arrival Time:{reservation.FlightRet. ArrivalTime}<br/>
Seats: {reservation.ReturnseatNrs}<br/>

Number of Passengers: {reservation.NrPassengers}<br/>
Class: {reservation.EconomyorBusiness==1? "Economy":"Business"}<br/>
Baggage: {reservation.EconomyorBusiness==1? "Two 23 KG Bags":"Two 32 KG Bags"}<br/>
</div>
  
</Grid>
          </Grid>
            </Paper>
            <>
           
           <Button  variant="contained" color="primary" display = "flex" id={reservation._id}  marginright onClick={handleCheckIn}>Check In</Button>
           {" "}
           <Button  variant="contained" color="primary" display = "flex"   marginright onClick={setModalIsOpenToTrue}>Cancel Reservation</Button>
         
           <Modal isOpen={modalIsOpen} style={customStyles}>
               <button onClick={setModalIsOpenToFalse}>x</button>
               <div>
                   <h2>Are you sure you want to cancel this reservation?</h2>
                   <br/>               <br/>
               <div>
               <Button  variant="contained" color="primary" display = "flex"  id={reservation._id} marginright onClick={handleClickYesDelete}>Yes</Button>
               {'                                                     '}
               <Button  variant="contained" color="primary" display = "flex"   marginleft onClick={setModalIsOpenToFalse}>No</Button>
               </div>
               </div>
           </Modal>
       </>
            </Grid>
          </Grid>
            </Paper>
            </div>
          
</div> 
 
      <div/>
           
        </div>))
      }
      </div>
      );
      } 