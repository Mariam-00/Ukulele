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
  } from "@material-ui/core";
  import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
   
export default function Dummy (props)
{   const[arrays, setArrays]=useState([]);
    const[array,setArray]=useState([]);
    const[combine,setCombine]=useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:8000/reservations/search?userId='+props.match.params.id).then((response1) => {
          setArray(response1.data);
          for(var i=0;i<response1.data.length;i++)
          {
            axios.get('http://localhost:8000/flights/search?FlightNumber='+ response1.data[i].FlightDepartureNr).then((response) => {
            
                setArrays(arrays => arrays.concat(response.data))
          
            })
          }
          for(var i=0;i<response1.data.length;i++)
          {
            axios.get('http://localhost:8000/flights/search?FlightNumber='+ response1.data[i].FlightReturnNr).then((response) => {
           // retFlight.push(response.data);
            })
          }
          
          
           
          });
         
         
         
        }, []);
    
    
 return(
     <div>
      {array.map((arrs)=>(
       <div>


       {arrays.map((arr)=>(
       <div>
        <p> Farah: {arr.FlightNumber}</p>
       </div>
        ))
        }

    </div>
        ))
        }

         </div>







































































 )
}