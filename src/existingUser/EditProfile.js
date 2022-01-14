import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
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
 
export default function ExistingUserHome (props)
{  const classes = useStyles();
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
    
  const [name,setName]= useState();
  const [email,setEmail]= useState();
  const [mobile,setMobile]= useState();
  const [password,setPassword]= useState();
  const[user,setUser]=useState({});
//   var flag =false;
//   localStorage.setItem("flag",flag);
const buttonn= localStorage.getItem("button");

    const onClickChange = async e=>{
        e.preventDefault();
       
        axios.put('http://localhost:8000/users/update/'+props.match.params.id,user)
        .then(res => console.log(res.data))
        .then(
          ()=>{
           alert("Changed Successfully!");
         })}
        
       
  const onChange= (e)=>{
    if(e.target.value !=" ")
    setUser({...user,[e.target.name]:e.target.value});
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
              <Link to={"/user/"+ props.match.params.id} className={classes.link}>
                Profile
              </Link>
              <Link to= {"/bookings/"+ props.match.params.id} className={classes.link}>
                My Bookings
              </Link>
              <Link to={"/book/"+ props.match.params.id} className={classes.link}>
                Book A Flight
              </Link>
              <Link to="/home" className={classes.link}>
                Sign Out
              </Link>
            </div>
        </Toolbar>
      </AppBar>
<Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
             <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xl>
              <div class="wrapper">
              {buttonn==1?(
                  <div>
                 <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 name="FirstName"
                 label="First Name"
                 id="changeNameF"
                 onChange = {onChange}
               />
                  <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 name="LastName"
                 label="Last Name"
                 id="changeNameL"
                 onChange = {onChange}
               />
               </div>
              ):(
                  buttonn==2?(
              <div>

               <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 name="Email"
                 label="New E-mail"
                 id="changeEmail"
                 onChange = {onChange}
               />

              </div>) 
              :buttonn==3?(
              <div>
                <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 name="Password"
                 label="New Password"
                 id="changePassword"
                 onChange = {onChange}
               />

              </div>):buttonn==4?(
              <div>
              <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 name="MobileNumber"
                 label="New Mobile Number"
                 id="changeMobile"
                 onChange = {onChange}
               />
              </div>):buttonn==5?(
               <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 name="PassportNumber"
                 label="New Passport Number"
                 id="changePassport"
                 onChange = {onChange}
               />):(<div></div>)
              )
              }
            
              <Button  variant="contained" color="primary" display = "flex"   marginright onClick={onClickChange}>Change</Button>
        </div>
              </Grid> 
              </Grid> 
      </Paper>
</div>
    );
}
