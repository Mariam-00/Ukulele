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
  CssBaseline,
  makeStyles,
  Typography,
  Toolbar,
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
export default function ConfirmReservation(props)
{  const[flight1,setFlight1]=useState([]);
   const[flight2,setFlight2]=useState([]);
   const[depFlighNr,setDep]=useState();
   const[retFlighNr,setRet]=useState();
   const[nrPassengers,setPass]=useState();
   const[economyOrbusiness,setEco]=useState();
   const[totalPrice, setTotalPrice]=useState(0);
   const classes=useStyles();

   
   const seatNrs=[];
  const id1=localStorage.getItem("selectedDepartureFlightId");
  const id2=localStorage.getItem("selectedReturnFlightId");
   useEffect(async ()=>{
    axios.get('http://localhost:8000/flights/find/'+id1).then((response) => {
        setFlight1(response.data);
        setDep(response.data.FlightNumber);
      

    axios.get('http://localhost:8000/flights/find/'+id2).then((response2) => {
        setFlight2(response2.data);
        setRet(response2.data.FlightNumber);


      setPass(Number(localStorage.getItem("NrPassengers")));

      if(localStorage.getItem("class")==="Economy")
      {
         setEco(1)
         setTotalPrice((Number(response.data.PriceEconomy)+Number(response2.data.PriceEconomy))*Number(localStorage.getItem("NrPassengers")));

      }
    else if(localStorage.getItem("class")==="Business")
        {
            setEco(2);
            setTotalPrice((Number(response.data.PriceBusiness)+Number(response2.data.PriceBusiness))*Number(localStorage.getItem("NrPassengers")));

        }
      });
    });  
    }, []);

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
          window.location.href = "/edit/:id";}
  
    const handleClickYesConfirm =(e)=>{
      const userId=localStorage.getItem("userId");
        // console.log(totalPrice);
        // console.log(economyOrbusiness);
        
        var DepartureSeatNrs =[];
        for(var i=0;i<nrPassengers;i++)
        {
          DepartureSeatNrs.push(" ");
        }
        var ReturnSeatNrs =[];
        for(var i=0;i<nrPassengers;i++)
        {
          ReturnSeatNrs.push(" ");
        }
       
        const FlightDep =flight1;
        const FlightRet=flight2;
        const Reservation = {userId:userId,NrPassengers:nrPassengers,EconomyorBusiness:economyOrbusiness,DepartureseatNrs:DepartureSeatNrs,ReturnseatNrs:ReturnSeatNrs,CheckedIn:0,FlightDep:FlightDep,FlightRet:FlightRet,TotalPrice:totalPrice};
        console.log(Reservation);
        axios.post('http://localhost:8000/reservations/',Reservation)
        .then((res)=>{
         localStorage.setItem("currentReservationForPayment",JSON.stringify(res.data));
            window.location.href="/payment/"+totalPrice;
      });

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
              <Link to={"/user/"+ localStorage.getItem("userId")} className={classes.link}>
                Profile
              </Link>
              <Link to={"/bookings/"+ localStorage.getItem("userId")} className={classes.link}>
                My Bookings
              </Link>
              <Link to={"/search-available"} className={classes.link}>
                Book A Flight
              </Link>
              <Link to="/" className={classes.link}>
                Sign Out
              </Link>
            </div>
        </Toolbar>
      </AppBar>
      <br/>
      <br/>
        <h1>Confirm Reservation</h1>
        <div >
            
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
             
              <b> Departure Flight's Number:{flight1.FlightNumber}</b> <br/>
              <b> Departure Flight's Date:{flight1.Date}</b> <br/>
              <b> Departure Flight's Departure Time: {flight1.DepartureTime}</b><br/>
              <b> Departure Flight's Arrival Time: {flight1.ArrivalTime}</b><br/>
              <b> Departure Flight's Cabin Class:{localStorage.getItem("class")}</b><br/>
              {localStorage.getItem("class")==="Economy"?
              <b>Departure Flight's Price:{flight1.PriceEconomy}</b>:
              <b>Departure Flight's Price:{flight1.PriceBusiness}</b>}
              <br/>
              <b> Departure Flight's Seat Number: Seat Number Not Chosen Yet Please Check In To Choose It</b><br/>
              <b> Return Flight's Date:{flight2.Date} </b><br/>
              <b> Return Flight's Departure Time : {flight2.DepartureTime}</b><br/>
              <b> Return Flight's Arrival Time :{flight2.ArrivalTime}</b><br/>
              <b> Return Flight's Cabin Class:{localStorage.getItem("class")}</b><br/>
              {localStorage.getItem("class")==="Economy"?
              <b>Return Flight's Price:{flight2.PriceEconomy}</b>:
              <b>Return Flight's Price:{flight2.PriceBusiness}</b>}
              <br/>
              <b> Return Flight's Seat Number: Seat Number Not Chosen Yet Please Check In To Choose It</b><br/>
              {localStorage.getItem("class")==="Economy"?
    
                 <b> Total Price :{(Number(flight1.PriceEconomy)+Number(flight2.PriceEconomy))*Number(localStorage.getItem("NrPassengers")) }</b>
                 :
                 <b> Total Price :{(Number(flight1.PriceBusiness)+Number(flight2.PriceBusiness))*Number(localStorage.getItem("NrPassengers")) }</b>
    
              }
           
                 
                
              </div>
        
              <>
          
           {" "}

            
          

        </>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          
            </Paper>
         
            <Button  variant="contained" color="primary" display = "flex"   marginright onClick={setModalIsOpenToTrue}>Confirm Reservation</Button>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <div>
                    <h2>Are You Sure You Want To Confirm This Reservation ?</h2>
                    <br/>               <br/>
                <div>
                <Button  variant="contained" color="primary" display = "flex"  marginright onClick={handleClickYesConfirm}>Yes</Button>
                {'                                                     '}
                <Button  variant="contained" color="primary" display = "flex"   marginleft onClick={setModalIsOpenToFalse}>No</Button>
                </div>
                </div>
            </Modal>
            
            
          
            
        </div>
        </div>
    );
}