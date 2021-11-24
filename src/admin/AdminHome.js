import React, { useEffect, useState } from 'react';
import { Container ,Paper,Button} from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
//import Cust_appbar from './Cust_appbar'

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

    return(
        <div>
            <div>
            <Button variant="contained" color="green"  display = "flex" marginright onClick={handleCreateClick}>Create A Flight</Button>
            </div>
            <div>
            <Button variant="contained" color="green"  display = "flex" marginright onClick={handleListFlights}>List All Flights</Button>
            </div>
            <div>
            <Button variant="contained" color="green"  display = "flex" marginright onClick={handleSearch}>Search</Button>

            </div>
          

        </div>
    );
}