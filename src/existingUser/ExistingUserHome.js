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
{   const classes = useStyles();
    const[user,setUser]=useState([])
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
        localStorage.setItem("button",1);
        window.location.href = "/edit/"+props.match.params.id;

        
    }
    const onClickE = async e=>{
        e.preventDefault();
        localStorage.setItem("button",2);
        window.location.href = "/edit/"+props.match.params.id;
    }
    const onClickP = async e=>{
        e.preventDefault();
        localStorage.setItem("button",3);
        window.location.href = "/edit/"+props.match.params.id;
    }
    const onClickM = async e=>{
        e.preventDefault();
        localStorage.setItem("button",4);
        window.location.href = "/edit/"+props.match.params.id;
    }
    const onClickPass = async e=>{
      e.preventDefault();
      localStorage.setItem("button",5);
      window.location.href = "/edit/"+props.match.params.id;
  }
    useEffect(()=>{
        axios.get('http://localhost:8000/users/'+props.match.params.id).then((response) => {
            setUser(response.data);
          });
        }, []);
        
    return (
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
              <Link to={"/bookings/"+ props.match.params.id} className={classes.link}>
                My Bookings
              </Link>
              <Link to={"/search-available"} className={classes.link}>
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
              <b>Name: {user.FirstName + " "+ user.LastName}</b><br/>
              </div>
              <Button  variant="contained" color="primary" display = "flex"   marginright onClick={onClickN}>Edit</Button>
        
              </Grid> 
              </Grid> 
              </Paper>
              <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
             <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xl>
              <div class="wrapper">
              <b>E-mail: {user.Email}</b><br/>
              </div>
              <Button  variant="contained" color="primary" display = "flex"   marginright onClick={onClickE}>Edit</Button>
        
              </Grid> 
              </Grid> 
      </Paper>
       <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
             <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xl>
              <div class="wrapper">
              <b>Password: ******** </b><br/>
              </div>
              <Button  variant="contained" color="primary" display = "flex"   marginright onClick={onClickPass}>Edit</Button>
        
              </Grid> 
              </Grid> 
      </Paper>
      <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
             <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xl>
              <div class="wrapper">
              <b>Mobile Number: {user.MobileNumber} </b><br/>
            
              <Button  variant="contained" color="primary" display = "flex"   marginright onClick={onClickM}>Edit</Button>
        </div>
              </Grid> 
              </Grid> 
      </Paper>
      <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} >
             <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xl>
              <div class="wrapper">
              <b>Passport Number: {user.PassportNumber} </b><br/>
            
              <Button  variant="contained" color="primary" display = "flex"   marginright onClick={onClickPass}>Edit</Button>
        </div>
              </Grid> 
              </Grid> 
      </Paper>
       
      </div>

    );
  
    
}
