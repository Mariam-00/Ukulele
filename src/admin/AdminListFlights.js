import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container ,Paper,Button} from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2';
//import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';



export default function AdminListAllFlights()
{   const[flights,setFlights]=useState([])

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
           
           window.location.href="/test/"+flight;
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
     
    return(
        <div>
        <h1>Available Flights</h1>
        <div >
            {flights.map(flight=>(
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
                  DepartureAirport: {flight.DepartureAirport}<br/>
                  ArrivalAirport:{flight.ArrivalAirport}<br/>
                  PriceEconomy:{flight.PriceEconomy}<br/>
                  PriceBusiness:{flight.PriceBusiness}<br/>

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
            {/* <div marginRight>
              <Button variant="contained" color="primary" id={restr.id}  display = "flex" marginright onClick={handleMenuClick}>Menu</Button>
            </div> */}
            </Grid>
          </Grid>
         
            </Paper>
            
            
            ))
            } 
             {/* <div >
              <Button variant="contained" color="primary" id={localStorage.getItem("email")} display = "flex" marginright onClick={handleOrderClick}>View My Orders</Button>
            </div> */}
            
        </div>
        </div>
    );
}