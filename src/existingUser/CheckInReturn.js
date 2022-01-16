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
   
export default function CheckInReturn (props)
{   const[reservation, setReservation]=useState([]);
    const[depSeats,setDepSeats]=useState([]);
    const [arraySeats, setArraySeats] = useState([]);
    const [seatsClicked, setSeatsClicked] = useState(0);
   

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
            setDepSeats(response.data.FlightRet.ReservedBusinessSeats); 
            }
            else {
              setDepSeats(response.data.FlightRet.ReservedEconomySeats);
            }
          
          });
           
        }, []);
      
     
      const handleClickYesDelete = async  e=>{
        e.preventDefault();
        var arr=depSeats;
        var arr2=depSeats;
        console.log("ENTERED")
        var flag= true;
        var flag2= true;
        const seatId= e.currentTarget.id


        if (seatsClicked === (reservation.NrPassengers)&&!arraySeats.includes(seatId)) {
          
          alert("You cant choose more than "+reservation.NrPassengers+" seats")
          return;}
    
        if (arraySeats.includes(seatId)) {
          setArraySeats((prev) =>
            prev.filter((seat) => seatId !== seat)
          );
          setSeatsClicked((prev) => prev - 1);


          for(var i=0;i<arr2.length;i++)
          { 
            if(arr2[i].SeatId===seatId)
            { 
                 arr2[i]={SeatId:seatId,Available:1};
                 break;
            }
          }
           setDepSeats(arr2);
  
    return;


        } 
        
        else {
          setSeatsClicked((prev) => prev + 1);
          console.log(seatsClicked);
    
          setArraySeats((prev) => [...prev, seatId]);
        }
        console.log(arraySeats);




        for(var i=0;i<arr.length;i++)
        { 
          
        console.log("for loop");
        console.log(arr[i].SeatId)
        console.log(seatId);
        console.log(arr[i].SeatId===seatId)



          if(arr[i].SeatId===seatId)
          {  
             flag=false;
               arr[i]={SeatId:seatId,Available:0};
               break;
          }
        }
        if(flag===false){
         setDepSeats(arr);

    }
  }

  const onSubmit = ()=>{
    
    if (seatsClicked< reservation.NrPassengers){
      alert("Please choose "+ (( reservation.NrPassengers)-seatsClicked) +" more seat(s)")
    return;
  }


    const FlightNr=reservation.FlightRet.FlightNumber;
    console.log(FlightNr)
    var Flight={};


if(reservation.EconomyorBusiness==1)
{
Flight={ReservedEconomySeats:depSeats};
}
else
{
Flight={ReservedBusinessSeats:depSeats};
}
    console.log(Flight);
    axios.get('http://localhost:8000/flights/search?FlightNumber='+FlightNr).then((response) => {
      console.log(response.data._id)

      axios.put('http://localhost:8000/flights/update'+response.data[0]._id,Flight)
      .then(res => console.log(res.data))
      .then(
        ()=>{
     
       

     axios.get('http://localhost:8000/flights/search?FlightNumber='+FlightNr).then((response)=>{
      console.log(response.data)
      axios.put('http://localhost:8000/reservations/update/'+reservation._id,{CheckedIn:1, ReturnseatNrs: arraySeats,FlightRet:response.data[0]})
      .then(res => console.log(res.data))
      .then(
        ()=>{
         
          window.location.href="/bookings/"+ localStorage.getItem("userId");
        })
     })
    })
        
      
  });
    }

  

    
return(
<div>  
     {depSeats.map((seatDep)=>(
    <div>  <l> {seatDep.SeatId}
    {console.log(seatDep.SeatId +" av:" +seatDep.Available)}
  
       
             <IconButton        color={ arraySeats.includes(seatDep.SeatId)?"success": (seatDep.Available===1)?"primary":"error"} 

            disabled={(arraySeats.includes(seatDep.SeatId) ||(seatDep.Available==1))?false:true}
             
             aria-label={seatDep.SeatId}  id={seatDep.SeatId} onClick={handleClickYesDelete}>
                <ChairSeat /> 
            </IconButton>
            </l>
       

    </div>)
    )
    } 

    {/* {(depSeats??[]).map((row,i)=>{
      return(
<Box>
  {
    (row??[]).map((col,j)=> {
  if(col!=null){
     return(
 <div>
   <Button>Pop</Button>
 </div>
     )
  }
    }
    )
  }
</Box>

      )
    }


    )
  } */}

  
     <Button onClick={onSubmit}>Confirm</Button>

</div>
);
}