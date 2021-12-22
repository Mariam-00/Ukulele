import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ChairSeat from '@mui/icons-material/EventSeat';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import Modal from 'react-modal';


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
import { Link } from "react-router-dom";
   
export default function CheckIn (props)
{   const[reservation, setReservation]=useState([]);
    const[depSeats,setDepSeats]=useState([]);
    const[retSeats,setRetSeats]=useState([]);
    const [depSeatIds, setDepSeatIds]=useState([]);
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
        axios.get('http://localhost:8000/reservations/'+localStorage.getItem("reservationIdCheckIn")).then((response) => {
            setReservation(response.data)
            
            if(response.data.EconomyorBusiness==2) {
            setDepSeats(response.data.FlightDep.ReservedBusinessSeats); 
            }
            else {
              setDepSeats(response.data.FlightDep.ReservedEconomySeats);
            }
          
          });
           
             

        }, []);
        const onClickSeat = async e=>{
          e.preventDefault();
         
  
      }
      
    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
            setModalIsOpen(true)
        }
    
    const setModalIsOpenToFalse =()=>{
            setModalIsOpen(false)
        }
      const [color, setColor] = useState();

      const changeColor = (e) => {
          // setColor = "Hello";
        



      }
      const handleClickYesDelete = async e=>{
        e.preventDefault();
        var arr=depSeats;
        var flag= true;
        const seatId=e.currentTarget.id;
        for(var i=0;i<arr.length;i++)
        {  console.log("for loop");
        console.log(arr[i].SeatId)
        console.log(seatId);
        console.log(arr[i].SeatId===seatId)
          if(arr[i].SeatId===seatId)
          {  console.log("first if");
            if(arr[i].Available==1)
             { console.log("second if ");
               alert("Sorry This Seat is Already Reserved!");
             }
             else
             { console.log("else");
             flag=false;
               arr[i]={SeatId:seatId,Available:1};
               localStorage.setItem("arr[i]",arr[i]);
               break;
             }
          }
        }
        if(flag===false){
        const FlightNr=reservation.FlightDep.FlightNumber;
        console.log(FlightNr)
        var Flight={};
  if(reservation.EconomyorBusiness==1)
  {
    Flight={ReservedEconomySeats:arr};
  }
  else
  {
    Flight={ReservedBusinessSeats:arr};
  }
        console.log(Flight);
        axios.get('http://localhost:8000/flights/search?FlightNumber='+FlightNr).then((response) => {
          console.log(response.data._id)

          axios.put('http://localhost:8000/flights/update'+response.data[0]._id,Flight)
          .then(res => console.log(res.data))
          .then(
            ()=>{
         
            })
            
          
         });

         axios.get('http://localhost:8000/flights/search?FlightNumber='+FlightNr).then((response)=>{
          console.log(response.data)
          axios.put('http://localhost:8000/reservations/update/'+reservation._id,{CheckedIn:1,FlightDep:response.data[0]})
          .then(res => console.log(res.data))
          .then(
            ()=>{
              window.location.href="/checkInReturn/"
            })
         })
        }
  
  
  

    }
    
return(
<div>  
    {depSeats.map((seatDep)=>(
    <div>
       
      
        <l> {seatDep.SeatId}<br/>
    
            <IconButton color="primary" aria-label="seat0"  id={seatDep.SeatId} onClick={setModalIsOpenToTrue} >
                <ChairSeat /> 
            </IconButton>
            </l>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <div>
                    <h2>Are you sure you want to confirm this seat?</h2>
                    <br/>               <br/>
                <div>
                <Button  variant="contained" color="primary" display = "flex"  id={seatDep.SeatId} marginright onClick={handleClickYesDelete}>Yes</Button>
                {'                                                     '}
                <Button  variant="contained" color="primary" display = "flex"   marginleft onClick={setModalIsOpenToFalse}>No</Button>
                </div>
                </div>
            </Modal>
     

    </div>)
    )
    }
   


</div>
);
}