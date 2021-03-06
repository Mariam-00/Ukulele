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
    const[userEmail,setUserEmail]=useState();
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
          
          axios.get('http://localhost:8000/users/'+localStorage.getItem("userId")).then((response) => {
              setUserEmail(response.data.Email);
              });

            if(localStorage.getItem("depPriceRef")!=null)
            {
              window.confirm("The Amount " + localStorage.getItem("depPriceRef") +"  EGP Will Be Refunded To Your Account As Soon As Possible");
              localStorage.removeItem("depPriceRef");
            } 
            
            if(localStorage.getItem("retPriceRef")!=null)
            {
              window.confirm("The Amount " + localStorage.getItem("retPriceRef") +"  EGP Will Be Refunded To Your Account As Soon As Possible");
              localStorage.removeItem("retPriceRef");
            } 

            if(localStorage.getItem("depPriceExtra")!==null)
             {
              localStorage.removeItem("depPriceExtra");
             }
             if(localStorage.getItem("retPriceExtra")!==null)
             {
              localStorage.removeItem("retPriceExtra");
             }
       
         }, []);
     
    

       const handleClickYesDelete = async (resv)=>{
        
         var depSeats=[];
         var retSeats=[];

         var FlightOldD={};
         var FlightOldR={};

         var flOldEcoPassD= resv.FlightDep.NrEconomySeats+resv.NrPassengers;
         var flOldBusPassD= resv.FlightDep.NrBusinessSeats+resv.NrPassengers;
         var flOldEcoPassR= resv.FlightRet.NrEconomySeats+resv.NrPassengers;
         var flOldBusPassR= resv.FlightRet.NrBusinessSeats+resv.NrPassengers;

         var reservedRSeat=resv.ReturnseatNrs;
         var reservedDSeat=resv.DepartureseatNrs;

    if(resv.EconomyorBusiness==1){
      depSeats=resv.FlightDep.ReservedEconomySeats;
      retSeats=resv.FlightRet.ReservedEconomySeats;
    }
    else{
      depSeats=resv.FlightDep.ReservedBusinessSeats;
      retSeats=resv.FlightRet.ReservedBusinessSeats;
    }
         if (resv.CheckedIn===1) {
          //remove seats from old flight
        
          for(var i=0;i<depSeats.length;i++)
          { 
              for(var j=0;j<reservedDSeat.length;j++){
      
                  if(depSeats[i].SeatId===reservedDSeat[j])
                  {  
                    depSeats[i]={SeatId:depSeats[i].SeatId,Available:1};
                  }
      
              }
          }

          for(var i=0;i<retSeats.length;i++)
          { 
              for(var j=0;j<reservedRSeat.length;j++){
      
                  if(retSeats[i].SeatId===reservedRSeat[j])
                  {  
                    retSeats[i]={SeatId:retSeats[i].SeatId,Available:1};
                  }
      
              }
          }
  

         if(resv.EconomyorBusiness==1){
            FlightOldD={NrEconomySeats:flOldEcoPassD,ReservedEconomySeats:depSeats};
            FlightOldR={NrEconomySeats:flOldEcoPassR,ReservedEconomySeats:retSeats};

          }
        else{
             FlightOldD={NrBusinessSeats:flOldBusPassD,ReservedBusinessSeats:depSeats};
             FlightOldR={NrBusinessSeats:flOldBusPassR,ReservedBusinessSeats:retSeats};

           }
          }

        else{
          if(resv.EconomyorBusiness==1){
            FlightOldD={NrEconomySeats:flOldEcoPassD};
            FlightOldR={NrEconomySeats:flOldEcoPassR};

          }
        else{
             FlightOldD={NrBusinessSeats:flOldBusPassD};
             FlightOldR={NrBusinessSeats:flOldBusPassR};

        
        }
      }
          
         //remove passengers from oldflight 
         axios.put('http://localhost:8000/flights/update'+resv.FlightDep._id,FlightOldD)
         .then(res => console.log(res.data));
         
           
           axios.put('http://localhost:8000/flights/update'+resv.FlightRet._id,FlightOldR)
           .then(res => console.log(res.data));
          



        axios.delete('http://localhost:8000/reservations/delete/'+resv._id)
  .then(() => {
    alert("Flight deleted!");
  
       
 const resid=resv._id;
 const price= resv.TotalPrice;
    axios.post("http://localhost:8000/emails/cancellation", {
      userEmail,
      price,
     resid,
    });
   


    window.location.href = "/bookings/"+ localStorage.getItem("userId");
  });
    }



 const handleCheckIn = async e=>{
        e.preventDefault();
       const res=e.currentTarget.id;

       axios.get('http://localhost:8000/reservations/'+res).then((response) => {
           if (response.data.CheckedIn===0) {
             localStorage.setItem("reservationIdCheckIn",res);
             window.location.href="/checkIn/";}
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

    const changeDepart = async e=>{
       e.preventDefault();
       localStorage.setItem("depFlightResId",e.currentTarget.id);
       window.location.href="/look-flight";
       
    }
    const emailItinerary = async (reservation)=>{
     
    axios.post("http://localhost:8000/emails/emailItinerary", {
      userEmail,
      reservation
    })
    .then(response=>{
      alert("Sent Successfully!");
    })
    .catch(error=>{
       console.log(error.response)
    });
  
    }


    const changeDepSeat = async e=>{
      e.preventDefault();
      const res=e.currentTarget.id;

      axios.get('http://localhost:8000/reservations/'+res).then((response) => {
          if (response.data.CheckedIn===1|| localStorage.getItem("CheckedInNewDepSeats")=="1") {
            localStorage.setItem("reservationIdChangeDepFlight",res);
            window.location.href="/changeDepSeats/"+props.match.params.id;}
       else{
              alert("You Are Not Checked In To This Flight. Please Check In First!");
       }
      })
    }
    const changeRetSeat = async e=>{
      e.preventDefault();
      const res=e.currentTarget.id;

      axios.get('http://localhost:8000/reservations/'+res).then((response) => {
          if (response.data.CheckedIn===1 || localStorage.getItem("CheckedInNewRetSeats")=="1") {
            localStorage.setItem("reservationIdChangeRetFlight",res);
            window.location.href="/changeRetSeats/"+props.match.params.id;}
       else{
              alert("You Are Not Checked In To This Flight. Please Check In First!");
       }
      })
    }
    const changeReturn = async e=>{
      e.preventDefault();
      localStorage.setItem("retFlightResId",e.currentTarget.id);
      window.location.href="/lookret-flight";
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
                  From: {reservation.FlightDep.DepartureAirport}<br/>
                  To: {reservation.FlightDep.ArrivalAirport}<br/>
                  Date: {reservation.FlightDep.Date}<br/>
                  Departure Time:{reservation.FlightDep. DepartureTime}<br/>
                  Arrival Time:{reservation.FlightDep. ArrivalTime}<br/>
                  Seats: {reservation.DepartureseatNrs.map((reservedSeat)=>( <div>
<l>{reservedSeat}</l>
</div>))}
                  
                  Number of Passengers: {reservation.NrPassengers}<br/>
                  Class: {reservation.EconomyorBusiness==1? "Economy":"Business"}<br/>
                  Baggage: {reservation.EconomyorBusiness==1? "Two 23 KG Bags":"Two 32 KG Bags"}<br/>
                  Price:{reservation.EconomyorBusiness==1? (reservation.FlightDep.PriceEconomy*reservation.NrPassengers): (reservation.FlightDep.PriceBusiness*reservation.NrPassengers)} <br/>

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
From: {reservation.FlightRet.DepartureAirport}<br/>
 To: {reservation.FlightRet.ArrivalAirport}<br/>
Date: {reservation.FlightRet.Date}<br/>
Departure Time:{reservation.FlightRet.DepartureTime}<br/> 
Arrival Time:{reservation.FlightRet.ArrivalTime}<br/>
Seats: { 
reservation.ReturnseatNrs.map((reservedSeat)=>( <div>
<l>{reservedSeat}</l>
</div>))
}

Number of Passengers: {reservation.NrPassengers}<br/>
Class: {reservation.EconomyorBusiness==1? "Economy":"Business"}<br/>
Baggage: {reservation.EconomyorBusiness==1? "Two 23 KG Bags":"Two 32 KG Bags"}<br/>
Price:{reservation.EconomyorBusiness==1? (reservation.FlightRet.PriceEconomy*reservation.NrPassengers):( reservation.FlightRet.PriceBusiness*reservation.NrPassengers)} <br/>
</div>
  
</Grid>
          </Grid>
            </Paper>
            <>
           
           <Button  variant="contained" color="primary" display = "flex" id={reservation._id}  marginright onClick={handleCheckIn}>Check In</Button>
           {" "}
           <Button  variant="contained" color="primary" display = "flex"   marginright onClick={() => {emailItinerary(reservation);}}>E-mail Itinerary</Button>
           {" "}
           <Button  variant="contained" color="primary" display = "flex"   marginright onClick={setModalIsOpenToTrue}>Cancel Reservation</Button>
           {" "}

        
           <br/> 
        <br/> 
        
           <Button  variant="contained" color="primary" display = "flex"  id={reservation._id}  marginright onClick={changeDepart}>Change Departure Flight</Button>
           {" "}
           <Button  variant="contained" color="primary" display = "flex"   id={reservation._id} marginright onClick={changeReturn}>Change Return Flight</Button>
           {" "}
           <br/> 
        <br/> 
           <Button  variant="contained" color="primary" display = "flex" id={reservation._id}  marginright onClick={changeDepSeat}>Change Departure Flight Seat</Button>
           {" "}
           <Button  variant="contained" color="primary" display = "flex"  id={reservation._id} marginright onClick={changeRetSeat}>Change Return Flight Seat</Button>

           <Modal isOpen={modalIsOpen} style={customStyles}>
               <button onClick={setModalIsOpenToFalse}>x</button>
               <div>
                   <h2>Are you sure you want to cancel this reservation?</h2>
                   <br/>               <br/>
               <div>
               <Button  variant="contained" color="primary" display = "flex"  id={reservation._id} marginright onClick={() => {handleClickYesDelete(reservation);}}>Yes</Button>
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