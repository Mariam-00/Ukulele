import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
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
export default function OneWayRet(props)
{   
    const[flight,setFlight]=useState([]);
    const classes = useStyles();
    //const passengers=localStorage.getItem("NrPassengers");
    const searchLink=props.match.params.id;
    const[flight2,setFlight2]=useState([]);
    const res=localStorage.getItem("depFlightResId");
    const [priceEconomy,setPriceEconomy]=useState();
    const[priceBusiness,setPriceBusiness]=useState();
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const[reservation,setReservation]=useState();
    const[passengers,setPassengers]=useState();
    useEffect(()=>{
      console.log(searchLink);
      axios.get('http://localhost:8000/flights/search?'+searchLink).then((response) => {
          setFlight(response.data);
          axios.get('http://localhost:8000/reservations/'+res).then((response) => {
             setPriceEconomy(response.data.FlightRet.PriceEconomy);
             setPriceBusiness(response.data.FlightRet.PriceBusiness);
             setPassengers(response.data.NrPassengers);
             setReservation(response.data);
             localStorage.setItem("retres",JSON.stringify(response.data));
             //localStorage.setItem("priceEconomy",response.data.FlightDep.PriceEconomy);
             
         })
        });
       

      }, []);

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
        window.location.href = "/edit/:id";}
   
   
    


   const handleClickYesSelect =(e)=>
   {
     // go to choose seats 
   }
    const handleDetailstClick =(e)=>
    { 
     e.preventDefault();
     window.location.href="/ret-det/"+e.currentTarget.id;
    };

    return(
        
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
              <Link to= {"/bookings/"+ localStorage.getItem("userId")} className={classes.link}>
                My Bookings
              </Link>
              <Link to={"/book/"+ localStorage.getItem("userId")} className={classes.link}>
                Book A Flight
              </Link>
              <Link to="/home" className={classes.link}>
                Sign Out
              </Link>
            </div>
        </Toolbar>
      </AppBar>
        <h1>Choose A Return Flight</h1>
        <div >
            
            {flight.map(flight=>(
                <div>
           { (localStorage.getItem("economy")==1) && (flight.NrEconomySeats>passengers)? 
           <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
            
              <div class="wrapper">
                 
             <b> FlightNumber: {flight.FlightNumber}<br/></b>
             <b> DepartureTime: {flight.DepartureTime}<br/></b>
            <b>  ArrivalTime: {flight.ArrivalTime}<br/></b>
            <b>  Date: {flight.Date}<br/></b>
              {
              (priceEconomy<flight.PriceEconomy)?
             <b> Extra Amount To Be Paid:{(passengers*flight.PriceEconomy)-(passengers*priceEconomy)}</b>
              :(priceEconomy>flight.PriceEconomy)?
              <b> Amount To Be Refunded:{(passengers*priceEconomy)-(passengers*flight.PriceEconomy)}</b>
              :(<div></div>)
              
                }
             
             </div> 
               
                 
             <div>
           
            
            </div>    
             
                       
              
        
              <>
            
           {" "}
           <Button  variant="contained" color="primary" display = "flex"   marginright onClick={setModalIsOpenToTrue}>Select</Button>
           {" "}
           <Button variant="contained" color="primary" id={flight._id}  display = "flex" marginright onClick={handleDetailstClick}>See Details</Button>

            <Modal isOpen={modalIsOpen} style={customStyles}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <div>
                    <h2>Are You Sure You Want To Select This Flight ?</h2>
                    <br/>               <br/>
                <div>
                <Button  variant="contained" color="primary" display = "flex"  marginright onClick={handleClickYesSelect}>Yes</Button>
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
          
       :(localStorage.getItem("business")==1) && (flight.NrBusinessSeats>passengers)?(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
            
              <div class="wrapper">
                 
             <b> FlightNumber: {flight.FlightNumber}<br/></b>
             <b> DepartureTime: {flight.DepartureTime}<br/></b>
             <b> ArrivalTime: {flight.ArrivalTime}<br/></b>
             <b> Date: {flight.Date}<br/></b>
             {(priceBusiness<flight.PriceBusiness)?
             <b> Extra Amount To Be Paid:{(passengers*flight.PriceBusiness)-(passengers*priceBusiness)}</b>
             :(priceBusiness>flight.PriceBusiness)?
             <b>Amount To Be Refunded :{(passengers*priceBusiness)-(passengers*flight.PriceBusiness)}</b>
             :(<div></div>)
              }
             </div> 
               
                 
                
             
                       
              
        
              <>
            
           {" "}
            

           <Button  variant="contained" color="primary" display = "flex"   marginright onClick={setModalIsOpenToTrue}>Select</Button>
           {" "}
           <Button variant="contained" color="primary" id={flight._id}  display = "flex" marginright onClick={handleDetailstClick}>See Details</Button>

            <Modal isOpen={modalIsOpen} style={customStyles}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <div>
                    <h2>Are You Sure You Want To Select This Flight ?</h2>
                    <br/>               <br/>
                <div>
                <Button  variant="contained" color="primary" display = "flex"  marginright onClick={handleClickYesSelect}>Yes</Button>
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
       ):(<div></div>)}

         </div>
            ))
          } 
             
            
        </div>
  
        </div>
    );
    
}