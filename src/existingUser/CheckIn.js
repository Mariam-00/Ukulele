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
export default function CheckIn ()
{   const[reservation, setReservation]=useState([]);
    const[depSeats,setDepSeats]=useState([]);
    const [arraySeats, setArraySeats] = useState([]);
    const [seatsClicked, setSeatsClicked] = useState(0);
    const [arrayS , setArrayS] = useState([]);
    const classes = useStyles();
    const  [newArr,setNewArr]=useState([]);
    
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
    const arro=[];
   
        axios.get('http://localhost:8000/reservations/'+localStorage.getItem("reservationIdCheckIn")).then((response) => {
            setReservation(response.data);
            if(response.data.EconomyorBusiness==2) {
            
            while(response.data.FlightDep.ReservedBusinessSeats.length) arro.push(response.data.FlightDep.ReservedBusinessSeats.splice(0,5));
            setNewArr(arro);
            
            }
            else {
              while(response.data.FlightDep.ReservedEconomySeats.length) arro.push(response.data.FlightDep.ReservedEconomySeats.splice(0,5));
              setNewArr(arro);
              
            }
          
          });
          axios.get('http://localhost:8000/reservations/'+localStorage.getItem("reservationIdCheckIn")).then((response) => {
            if(response.data.EconomyorBusiness==2) {
              setDepSeats(response.data.FlightDep.ReservedBusinessSeats); 
            }
            else{setDepSeats(response.data.FlightDep.ReservedEconomySeats);

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


    const FlightNr=reservation.FlightDep.FlightNumber;
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
      axios.put('http://localhost:8000/reservations/update/'+reservation._id,{ DepartureseatNrs: arraySeats,FlightDep:response.data[0]})
      .then(res => console.log(res.data))
      .then(
        ()=>{
         
          window.location.href="/checkInReturn/"
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