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
 
export default function ChangePassword (props)
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
    
 
  const[oldPassword,setOldPassword]=useState();
  const[newPassword,setNewPassword]=useState();

//const buttonn= localStorage.getItem("button");

    const onClickChange = async e=>{
        e.preventDefault();
        
        const userId=localStorage.getItem("userId");
        axios.get('http://localhost:8000/users/'+userId).then(
            (response)=>{
                console.log(response.data);
                const user = {OldPassword:oldPassword,Password:response.data.Password,NewPassword:newPassword}
                axios.put('http://localhost:8000/users/changePassword/'+userId,user)
                .then(res => console.log(res.data))
                .then(
                  ()=>{
                   alert("Password Changed Successfully!");
                 }).catch(err=>{
                   alert("Invalid Old Password!");
                 })
            }
        )
    }
        // axios.put('http://localhost:8000/users/update/'+userId,user)
        // .then(res => console.log(res.data))
        // .then(
        //   ()=>{
        //    alert("Changed Successfully!");
        //  })}
        
       
 

 
        
    
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
              <Link to={"/search-available"} className={classes.link}>
                Book A Flight
              </Link>
              <Link to="/" className={classes.link}>
                Sign Out
              </Link>
            </div>
        </Toolbar>
      </AppBar>
<Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
             <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xl>
                  <h1> Change Password</h1>
              <div class="wrapper">
             
              
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Old Password"
            label="Old Password"
            id="oldPassword"
            onChange = {e =>setOldPassword(e.target.value)}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="New Password"
            label="New Password"
            id="newPassword"
            onChange = {e =>setNewPassword(e.target.value)}
          />
            
              <Button  variant="contained" color="primary" display = "flex"   marginright onClick={onClickChange}>Change</Button>
        </div>
              </Grid> 
              </Grid> 
      </Paper>
</div>
    );
}
