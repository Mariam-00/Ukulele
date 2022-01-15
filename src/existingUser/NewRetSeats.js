import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ChairSeat from '@mui/icons-material/EventSeat';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

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
   
export default function NewRetSeats ()
{   const[reservation, setReservation]=useState([]);
    const[depSeats,setDepSeats]=useState([]);
    const [arraySeats, setArraySeats] = useState([]);
    const [seatsClicked, setSeatsClicked] = useState(0);
    const [depFlight , setDepFlight] = useState();
    const[oldSeats,setOldSeats]=useState([]);
    const[oldFlight, setOldFlight]=useState();
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
        axios.get('http://localhost:8000/reservations/'+localStorage.getItem("reservationIdNewRetSeats")).then((response) => {
            setReservation(response.data)
            setOldFlight(response.data.FlightDep);

            console.log("FlightDeP OLD" + response.data.FlightDep.FlightNumber);

            setOldSeats(response.data.DepartureseatNrs);
          });
          axios.get('http://localhost:8000/flights/find/'+ localStorage.getItem("flightIdNewRetSeats")).then((response) => {

           console.log("FLIGHT NEW " +response.data.FlightNumber);
           console.log(localStorage.getItem("business")=="1");
           console.log("BUSINESS" );

              setDepFlight(response.data);
             
            if(localStorage.getItem("business")=="1") {
                setDepSeats(response.data.ReservedBusinessSeats); 
                }
                else {
                  setDepSeats(response.data.ReservedEconomySeats);
                }
        });      
         

           
        }, []);
      
     
      const handleClickYesDelete = async  e=>{
        e.preventDefault();
        var arr=depSeats;
        var arr2=depSeats;
        var flag= true;
        var flag2= true;
        const seatId= e.currentTarget.id;

        console.log("DEPSEATS" + depSeats[0].SeatId);


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
            {  console.log("engteredddd")
                 arr2[i]={SeatId:seatId,Available:1};
                 break;
            }
          }
           setDepSeats(arr2);
  
    return;
        } 
        
        else {
          setSeatsClicked((prev) => prev + 1);
          setArraySeats((prev) => [...prev, seatId]);

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
  }

  const onSubmit = ()=>{
    
    if (seatsClicked< reservation.NrPassengers){
      alert("Please choose "+ (( reservation.NrPassengers)-seatsClicked) +" more seat(s)")
    return;
  }

     
    const FlightNr=depFlight.FlightNumber;
    const FlightNrOld=oldFlight.FlightNumber;

    console.log("New Flight" + FlightNr);
    console.log("ArraySeats"+ arraySeats[0]);
    console.log("DEPSEATS"+ depSeats[0].SeatId);
    console.log("OldFlight"+ oldFlight.FlightNumber);
    console.log("reservation eco or bus"+ reservation.EconomyorBusiness);

    var Flight={};
    var FlightOld={};
    var arrayOfSeats=[];

    if(reservation.EconomyorBusiness==1){
      arrayOfSeats=oldFlight.ReservedEconomySeats;
    }
    else{
        arrayOfSeats=oldFlight.ReservedBusinessSeats;
    }
    console.log("arrayOfSeats"+ arrayOfSeats[0]);
    console.log("oldSeats"+ oldSeats);
    var arrr= arrayOfSeats;
    for(var i=0;i<arrr.length;i++)
    { 
        for(var j=0;j<oldSeats.length;j++){

            if(arrr[i].SeatId===oldSeats[j])
            {  
                 arrr[i]={SeatId:arrr[i].SeatId,Available:1};
            }

        }
    }
    console.log("arrayOfSeats"+ arrayOfSeats[0].SeatId + " " +arrayOfSeats[0].Available + ","+ 
    arrayOfSeats[1].SeatId + " " +arrayOfSeats[1].Available);

if(reservation.EconomyorBusiness==1){
 FlightOld={ReservedEconomySeats:arrr};
}
else{
    FlightOld={ReservedBusinessSeats:arrr};
}

if(localStorage.getItem("business")=="1")
{
    Flight={ReservedBusinessSeats:depSeats};
}
else
{
    Flight={ReservedEconomySeats:depSeats};
}

console.log("flighNr",FlightNrOld);
axios.get('http://localhost:8000/flights/search?FlightNumber='+FlightNrOld).then((response) => {
    
console.log("THE FLIGHT" + response.data[0]._id)
     localStorage.setItem("flight",JSON.stringify(response.data));
     localStorage.setItem("FLIGHTOLD",JSON.stringify(FlightOld));
    axios.put('http://localhost:8000/flights/update'+response.data[0]._id,FlightOld)
    .then(res =>
         console.log(res.data))
    .then(
      ()=>{
      })
   });

    console.log(Flight);
    axios.get('http://localhost:8000/flights/search?FlightNumber='+FlightNr).then((response) => {
      console.log(response.data[0]._id)

      axios.put('http://localhost:8000/flights/update'+response.data[0]._id,Flight)
      .then(res => console.log(res.data))
      .then(
        ()=>{
       

     axios.get('http://localhost:8000/flights/search?FlightNumber='+FlightNr).then((response2)=>{
      console.log(response2.data)
      axios.put('http://localhost:8000/reservations/update/'+reservation._id,{ DepartureseatNrs: arraySeats,FlightDep:response2.data[0]})
      .then(res2 => console.log(res2.data))
      .then(
        ()=>{
            alert("Booked Successfully!");
            localStorage.setItem("CheckedInNewDepSeats",1);
          window.location.href="/bookings/"
        })
     })
    })
});
}
  

    
return(
<div>  
   { console.log(depSeats)}
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



  
     <Button color="primary" onClick={onSubmit}>Confirm</Button>

</div>
);
}