import StripeCheckOut from 'react-stripe-checkout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  CssBaseline,
  Typography,
  makeStyles,
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

export default function Payment(props)
{  const classes = useStyles();
    const totalPrice= props.match.params.id;

    const makePayment =token =>
    {
        const body={
            token,
            totalPrice
        }

        axios.post('http://localhost:8000/payment',body).then(response=>{
            console.log("response",response)
            const {status}= response;
            console.log('status',status)
        }).catch(err=>{
         console.log(err);
        })
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
              <Link to={"/user/"+ localStorage.getItem("userId")} className={classes.link}>
                Profile
              </Link>
              <Link to= {"/bookings/"+ localStorage.getItem("userId")} className={classes.link}>
                My Bookings
              </Link>
              <Link to={"/book/"+ localStorage.getItem("userId")} className={classes.link}>
                Book A Flight
              </Link>
              <Link to="/home" className={classes.link}>
                Sign Out
              </Link>
            </div>
        </Toolbar>
      </AppBar>
        <h1> Please Pay For The Flights To Proceed With Your Reservation  </h1>
        <StripeCheckOut
        stripeKey="pk_test_51KHYYqFthQdbjWDoKBEEaKUHsE9p0Z3hBCtxOg11fVj4BJWFqgWATbME0dPN9KxbWwWvilzW6y3Tdf8d3CK0V6i300MULwThmQ"
        token={makePayment}
        name="Pay For The Flights"
        amount={totalPrice*100}
        >
     <Button  variant="contained" color="primary" display = "flex"   marginright >Pay {totalPrice} EGP</Button>


        </StripeCheckOut>
        </div>
    );
}