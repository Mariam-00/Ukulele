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
  } from "@material-ui/core";
  import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import Modal from 'react-modal';

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
        axios.get('http://localhost:8000/reservations/search?userId='+props.match.params.id).then((response) => {
          setReservations(response.data);
          });
        }, []);
       console.log(reservations);
       const handleClickYesDelete = async e=>{
        e.preventDefault();
  //       const flight_id = e.currentTarget.id;
  //       localStorage.setItem("fid",flight_id);
  //       axios.delete('http://localhost:8000/flights/delete'+flight_id)
  // .then(() => {
  //   localStorage.setItem("this",flight_id);
  //   alert("Flight deleted!");
  //   window.location.href = "/list-flights";
  // });
    }
 const handleUpdate = async e=>{
        e.preventDefault();
      //   const flight=e.currentTarget.id;
       
      //  window.location.href="/test/"+flight;
    }    

const [modalIsOpen,setModalIsOpen] = useState(false);

const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    const onClickN = async e=>{
      e.preventDefault();
      // window.location.href = "/edit/:id";

      
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
              <Link to={"/user/"+ props.match.params.id} className={classes.link}>
                Profile
              </Link>
              <Link to={"/bookings/"+ props.match.params.id} className={classes.link}>
                My Bookings
              </Link>
              <Link to={"/book/"+ props.match.params.id} className={classes.link}>
                Book A Flight
              </Link>
              <Link to="/home" className={classes.link}>
                Sign Out
              </Link>
            </div>
        </Toolbar>
      </AppBar>
      <div >
            {reservations.map(reservation=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
              <b> Departure Flight Number: {reservation.FlightDepartureNr}</b><br/>
                  Return Flight Number: {reservation.FlightReturnNr}<br/>
                  Number of Passengers: {reservation.NrPassengers}<br/>
                  Class: {reservation.EconomyorBusiness==1? "Economy":"Business"}<br/>
                  Seats: {reservation.seatNrs}

              </div>
        
              <>
            <Button  variant="contained" color="primary" display = "flex"   marginright onClick={setModalIsOpenToTrue}>Delete</Button>
           {" "}
            <Button  variant="contained" color="primary" display = "flex" id={reservation._id}  marginright onClick={handleUpdate}>Update</Button>

            <Modal isOpen={modalIsOpen} style={customStyles}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <div>
                    <h2>Are you sure you want to delete this flight?</h2>
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
            <Grid item>
    
            </Grid>
          </Grid>
         
            </Paper>
            
            
            ))
            } 
            
            
        </div>




      </div>
      );
      }