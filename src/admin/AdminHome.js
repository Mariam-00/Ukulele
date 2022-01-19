import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Redirect,Link,browserHistory} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import {
    AppBar,
    Toolbar,
    CssBaseline,
    withMobileDialog,
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
const handleCreateClick = async e=>{
    e.preventDefault();
    window.location.href = "/create-flights";

}
const handleListFlights = async e=>{
    e.preventDefault();
    window.location.href="/list-flights";
}
const handleSearch = async e=>{
    e.preventDefault();
    window.location.href="/search-flights";
}


export default function AdminHome ()
{ 
     const classes =useStyles();
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
       
    return(
        <div>
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
           FlyFast
          </Typography>
            <div className={classes.navlinks}>
              <Link to={"/create-flights"} className={classes.link}>
                Create A Flight
              </Link>
              <Link to={"/list-flights"} className={classes.link}>
                List All Flights
              </Link>
              <Link to={"/search-flights"} className={classes.link}>
               Search For A Flight
              </Link>
            
            </div>
        </Toolbar>
      </AppBar>
  
         
          

        </div>
    );
}