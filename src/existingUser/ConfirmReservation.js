import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'
import Grid from '@material-ui/core/Grid';
import Modal from 'react-modal';

export default function Summary(props)
{  const[flight1,setFlight1]=useState([]);
   const[flight2,setFlight2]=useState([]);
   const id1=localStorage.getItem("selectedDepartureFlightId");
   const id2=localStorage.getItem("selectedReturnFlightId"); 
   useEffect(()=>{
    axios.get('http://localhost:8000/flights/find/'+id1).then((response) => {
        setFlight1(response.data);
        
      });

    axios.get('http://localhost:8000/flights/find/'+id2).then((response) => {
        setFlight2(response.data);
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
                <b> Total Price :{flight1.PriceEconomy+flight2.PriceEconomy} </b>
                :
                <b> Total Price :{(flight1.PriceBusiness)+(flight2.PriceBusiness)} </b>
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