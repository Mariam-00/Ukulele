import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Redirect,Link,browserHistory} from "react-router-dom";

import Swal from 'sweetalert2';
//import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popup from 'reactjs-popup'; 
import Modal from 'react-modal';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Paper,
  Grid,
  Button,
  Typography,
  withMobileDialog,
} from "@material-ui/core";

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

export default function AdminListAllFlights()
{   const[flights,setFlights]=useState([]);
    const classes =useStyles();

    useEffect(()=>{
        axios.get('http://localhost:8000/flights/findall').then((response) => {
            setFlights(response.data);
          });
        }, []);
     const handleClickYesDelete = async e=>{
            e.preventDefault();
            const flight_id = e.currentTarget.id;
            localStorage.setItem("fid",flight_id);
            axios.delete('http://localhost:8000/flights/delete'+flight_id)
      .then(() => {
        localStorage.setItem("this",flight_id);
        alert("Flight deleted!");
        window.location.href = "/list-flights";
      });
        }
     const handleUpdate = async e=>{
            e.preventDefault();
            const flight=e.currentTarget.id;
            axios.get('http://localhost:8000/flights/find/'+e.currentTarget.id).then((response) => {
            
              localStorage.setItem("FlightToBeUpdated",response.data);
              window.location.href="/test/"+flight;
    
            });
        
           
           //window.location.href="/test/"+flight;
        }    

    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
            setModalIsOpen(true)
        }
    
    const setModalIsOpenToFalse =()=>{
            setModalIsOpen(false)
        }
    
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
        const onClickN = async e=>{
          e.preventDefault();
          window.location.href = "/edit/:id";
  
          
      }
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
        <div >
            {flights.map(flight=>(
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
            <Button  variant="contained" color="primary" display = "flex"   marginright onClick={setModalIsOpenToTrue}>Delete</Button>
           {" "}
            <Button  variant="contained" color="primary" display = "flex" id={flight._id}  marginright onClick={handleUpdate}>Update</Button>

            <Modal isOpen={modalIsOpen} style={customStyles}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <div>
                    <h2>Are you sure you want to delete this flight?</h2>
                    <br/>               <br/>
                <div>
                <Button  variant="contained" color="primary" display = "flex"  id={flight._id} marginright onClick={handleClickYesDelete}>Yes</Button>
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