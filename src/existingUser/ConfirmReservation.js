import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';
import Modal from 'react-modal';

export default function ConfirmReservation(props)
{  const[flight1,setFlight1]=useState([]);
   const[flight2,setFlight2]=useState([]);
   const[depFlighNr,setDep]=useState();
   const[retFlighNr,setRet]=useState();
   const[nrPassengers,setPass]=useState();
   const[economyOrbusiness,setEco]=useState();
   const[totalPrice, setTotalPrice]=useState(0);

   
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

        var passengersF1=0;
        var passengersF2=0;
        if(economyOrbusiness==1){
           passengersF1= flight1.NrEconomySeats-nrPassengers;
           passengersF2= flight2.NrEconomySeats-nrPassengers;
          flight1.NrEconomySeats=passengersF1;
          flight2.NrEconomySeats=passengersF2;
        }
        if(economyOrbusiness==2){
          passengersF1= flight1.NrBusinessSeats-nrPassengers;
          passengersF2= flight2.NrBusinessSeats-nrPassengers;
         flight1.NrBusinessSeats=passengersF1;
         flight2.NrBusinessSeats=passengersF2;
       }
       
       
        const FlightDep =flight1;
        const FlightRet=flight2;
        axios.put('http://localhost:8000/flights/update'+flight1._id,flight1);
        axios.put('http://localhost:8000/flights/update'+flight2._id,flight2);
        
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
        <h1>Confirm Reservation</h1>
        <div >
            
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xl>
              <div class="wrapper">
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