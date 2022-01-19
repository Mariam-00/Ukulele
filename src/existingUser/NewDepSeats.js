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
export default function NewDepSeats ()
{   const[reservation, setReservation]=useState([]);
    const[depSeats,setDepSeats]=useState([]);
    const [arraySeats, setArraySeats] = useState([]);
    const [seatsClicked, setSeatsClicked] = useState(0);
    const [depFlight , setDepFlight] = useState();
    const[oldSeats,setOldSeats]=useState([]);
  const[oldFlight, setOldFlight]=useState();
  const [oldPrice,setOldPrice]=useState();
  const [newPrice,setNewPrice]=useState();
  const  [newArr,setNewArr]=useState([]);
  const classes = useStyles();

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
      const arr=[];

        axios.get('http://localhost:8000/reservations/'+localStorage.getItem("reservationIdNewDepSeats")).then((response) => {
            setReservation(response.data)
            setOldFlight(response.data.FlightDep);
            setOldSeats(response.data.DepartureseatNrs);
           
            if(response.data.EconomyorBusiness===2){
             
            setOldPrice(response.data.FlightDep.PriceBusiness);
            }
            else{
              setOldPrice(response.data.FlightDep.PriceEconomy);
            }
          });
          axios.get('http://localhost:8000/flights/find/'+ localStorage.getItem("flightIdNewDepSeats")).then((response) => {

              setDepFlight(response.data);
             
            if(localStorage.getItem("business2")=="1") {
                setDepSeats(response.data.ReservedBusinessSeats); 
                setNewPrice(response.data.PriceBusiness);
                }
                else {
                  setDepSeats(response.data.ReservedEconomySeats);
                  setNewPrice(response.data.PriceEconomy);
                }
        });      
        axios.get('http://localhost:8000/flights/find/'+ localStorage.getItem("flightIdNewDepSeats")).then((response) => {

          if(localStorage.getItem("business2")=="1") {
            while(response.data.ReservedBusinessSeats.length) arr.push(response.data.ReservedBusinessSeats.splice(0,5));
            setNewArr(arr);
          }
          else{
            while(response.data.ReservedEconomySeats.length) arr.push(response.data.ReservedEconomySeats.splice(0,5));
            setNewArr(arr);

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
          setArraySeats((prev) => [...prev, seatId]);

        for(var i=0;i<arr.length;i++)
        { 
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
    localStorage.setItem(" OLD PRICE ",oldPrice);
    localStorage.setItem(" NEW PRICE ",newPrice);
    localStorage.setItem(" RESV PRICE ",reservation.TotalPrice);
    console.log(" OLD PRICE ",oldPrice);
    console.log("Old Flight "+ oldFlight.FlightNumber);
    console.log("OLD F P B"+ oldFlight.PriceBusiness);
    console.log("OLD P CALC" +( oldPrice*Number(reservation.NrPassengers)));
    console.log("NEW P CALC" +( newPrice*Number(reservation.NrPassengers)));
    
    const totalP = Number(reservation.TotalPrice) - ( oldPrice*Number(reservation.NrPassengers)) +(newPrice*Number(reservation.NrPassengers));
    localStorage.setItem(" NEW TOTAL ",totalP);
    console.log("New Flight" + FlightNr);
    console.log("ArraySeats"+ arraySeats[0]);
    console.log("DEPSEATS"+ depSeats[0].SeatId);
    console.log("OldFlight"+ oldFlight.FlightNumber);
    console.log("reservation eco or bus"+ reservation.EconomyorBusiness);

    var Flight={};
    var FlightOld={};
    var arrayOfSeats=[];
    var ecoOrb=0;
    const flOldEcoPass=oldFlight.NrEconomySeats +reservation.NrPassengers;
    const flOldBusPass=oldFlight.NrBusinessSeats+reservation.NrPassengers;
    const flNewEcoPass=depFlight.NrEconomySeats-reservation.NrPassengers;
    const flNewBusPass=depFlight.NrBusinessSeats-reservation.NrPassengers;


    if(reservation.EconomyorBusiness==1){
      arrayOfSeats=oldFlight.ReservedEconomySeats;
    }
    else{
        arrayOfSeats=oldFlight.ReservedBusinessSeats;
    }
    // console.log("arrayOfSeats"+ arrayOfSeats[0]);
    // console.log("oldSeats"+ oldSeats);
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

if(reservation.EconomyorBusiness==1){
 FlightOld={NrEconomySeats:flOldEcoPass,ReservedEconomySeats:arrr};
}
else{
    FlightOld={NrBusinessSeats:flOldBusPass,ReservedBusinessSeats:arrr};
}

if(localStorage.getItem("business2")=="1")
{
    Flight={NrBusinessSeats:flNewBusPass,ReservedBusinessSeats:depSeats};
    ecoOrb=2;
}
else
{
    Flight={NrEconomySeats:flNewEcoPass,ReservedEconomySeats:depSeats};
    ecoOrb=1;
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
      axios.put('http://localhost:8000/reservations/update/'+reservation._id,{ EconomyorBusiness: ecoOrb,DepartureseatNrs: arraySeats,
      CheckedIn:1,FlightDep:response2.data[0],
    TotalPrice: totalP})
      .then(res2 => console.log(res2.data))
      .then(
        ()=>{
            localStorage.setItem("CheckedInNewDepSeats",1);
           
        
            if(localStorage.getItem("depPriceExtra")==null){
              window.location.href="/bookings/"+localStorage.getItem("userId");
              
              }
            
              else if(localStorage.getItem("depPriceExtra")!==null)
              {
                window.location.href="/payment/"+localStorage.getItem("depPriceExtra");
                
              }
        })
     })
    })
});
}
  

    
return(
<div>  
<AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}  style={{textAlign:"left"}}>
           FlyFast
          </Typography>
           
              
        </Toolbar>
      </AppBar>
      <br/>   <br/>   
      <h1>Please Choose Your Seat</h1>
      <Paper elevation={6} style={{margin:"50px",padding:"150px", textAlign:"center"}} >


{newArr.map((row,i) =>(
                 <div>
                       <Box display="flex">
                    { 
                     
                      row.map((seatDep,j)=>
                      <div style={{ display: "flex", justifyContent: "space-between" , padding:10}}>

                       <div>
                         <l>{seatDep.SeatId}
                         <IconButton  color={ arraySeats.includes(seatDep.SeatId)?"success": (seatDep.Available===1)?"primary":"error"} 

                          disabled={(arraySeats.includes(seatDep.SeatId) ||(seatDep.Available==1))?false:true}
 
                        aria-label={seatDep.SeatId}  id={seatDep.SeatId} onClick={handleClickYesDelete}>
                         <ChairSeat /> 
                          </IconButton>
                         
                         </l> 
                         
                       </div>
                       </div>
                      )
                    }
                    </Box>
                   </div>
                   
       ))

   
    } 

  </Paper>
  
<Button variant="contained" color="primary" display = "flex" onClick={onSubmit}>Confirm</Button>


</div>
);
}