import React, { useEffect, useState } from 'react';
import { Container, Paper, Button } from '@material-ui/core';
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
import { Redirect, Link, browserHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
//import DropDownMenu from '@material-ui/DropDownMenu';
//import MuiThemeProvider from '@material-ui/styles/MuiThemeProvider';

let searchlink = "";
let searchLink=" ";


export default function SearchAvailableFlights() {
    const [flight, setFlight] = useState({});
    const [counterAdult, setCounterAdult] = useState(0);
    const [counterChildren, setCounterChildren] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [DepartureAirport, setDepartureAirport] = useState();
    const [ArrivalAirport, setArrivalAirport] = useState();
    const[oneWay,setOneWay]=useState(false);
    const[arrivalDate,setArrivalDate]=useState("");
    const[departureDate,setDepartureDate]=useState("");
    const[value,setValue]=useState();
    const[value2,setValue2]=useState();


    const handleSubmit = () => { }

    const ShowFlights = (e) => {
        searchlink += "DepartureAirport=" + DepartureAirport + "&" + "ArrivalAirport=" + ArrivalAirport+"&"+"Date="+departureDate;
        localStorage.setItem("NrPassengers",counterAdult+counterChildren);
        //localStorage.setItem("value",value);
        if(oneWay===false)
        {
            searchLink+="DepartureAirport="+ArrivalAirport+"&"+"ArrivalAirport="+DepartureAirport+"&"+"Date="+arrivalDate;
            localStorage.setItem("searchlinkreturn",searchLink);
        }
        window.location.href="/list-dep/"+searchlink;
    }
  

    const IncCounterAdult = () => {
        setCounterAdult(counterAdult + 1);
    };

    const DecCounterAdult = () => {
        if (counterAdult === 0)
            setCounterAdult(0);
        else
            setCounterAdult(counterAdult - 1);
    };
    const IncCounterChildren = () => {
        setCounterChildren(counterChildren + 1);
    };

    const DecCounterChildren = () => {
        if (counterChildren === 0)
            setCounterChildren(0);
        else
            setCounterChildren(counterChildren - 1);
    };
    const handleDateChange =(event,date)=>
    {
        setStartDate(date);
        //setDepartureDate(startDate.toLocalDateString());
    }
    const handleChange=(e) =>
    {
        if(e.target.value==="Business")
        {
          localStorage.setItem("economy",0);
          localStorage.setItem("business",1);
          setValue("Business");
        }
        else{
            localStorage.setItem("economy",1);
            localStorage.setItem("business",0);
            setValue("Economy");
        }
    }

    const handleTrip=(e)=>
    {
        if(e.target.value=== "One Way")
        {
           setOneWay(true);
           setValue2("One Way");
           localStorage.setItem("oneWay",true);
        }
        else
        {
            setOneWay(false);
            setValue2("Round-Trip");
            localStorage.setItem("oneWay",false);
        }
    }



    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Paper elevation={5} >
                {/* <div>
                <Button variant="contained" color="primary" display="flex" marginright onClick={handleSubmit}>Round-Trip</Button>
                 <Button variant="contained" color="primary" display="flex" marginright onClick={handleSubmit}>One-Way</Button>

                </div> */}
                <div>
                <FormControl component="fieldset">
                    <FormLabel component="Trip"></FormLabel>
                    <RadioGroup
                        aria-label="Class"
                        name="controlled-radio-buttons-group"
                        value={value2}
                       
                    >
                        <FormControlLabel value="One Way" control={<Radio />} label="One Way" onChange={handleTrip} />
                        <FormControlLabel value="Round-Trip" control={<Radio />} label="RoundTrip" onChange={handleTrip} />
                      

                    </RadioGroup>
                </FormControl> 

                </div>
                
                <TextField
                    id="Departure_Airport"
                    label="From"
                    onChange={e => setDepartureAirport(e.target.value)}
                    margin="normal"
                />

                <TextField
                    id="Arrival_Airport"
                    label="To"
                    onChange={e => setArrivalAirport(e.target.value)}
                    margin="normal"
                />
                <br />
                {/* <TextField
                    id="flightNr"
                    label="when do you leave?"
                    //value={this.state.flightNumber}
                    onChange={e => this.state.flightNumber = e.target.value}
                    margin="normal"
                /> */}

                {/* <TextField
                    id="depTime"
                    label="When will you come back?"
                    // value={this.state.name}
                    onChange={e => this.state.departureTime = e.target.value}
                    margin="normal"
                /> */}
                {
                    // <LocalizationProvider dateAdapter={AdapterDateFns}>
                    //     <DatePicker
                    //         label="When will you leave"
                    //         value={startDate}
                    //         onChange={handleDateChange}
                    //         renderInput={(params) => <TextField {...params} />}
                    //     />
                    // </LocalizationProvider>

                    <TextField
                    id="DepartureDate"
                    label="When Will You Leave"
                    onChange={e => setDepartureDate(e.target.value)}
                    margin="normal"
                />
                }
                {oneWay===false?(
                <TextField
                    id="ArrivalDate"
                    label="When Will You Return"
                    onChange={e => setArrivalDate(e.target.value)}
                    margin="normal"
                />
              ):(<div></div>)}
               

                <br />

                { <FormControl component="fieldset">
                    <FormLabel component="Class"></FormLabel>
                    <RadioGroup
                        aria-label="Class"
                        name="controlled-radio-buttons-group"
                        value={value}
                        //OnChange={handleChange}
                    >
                        <FormControlLabel value="Business" control={<Radio />} label="Business" onChange={handleChange}/>
                        <FormControlLabel value="Economy" control={<Radio />} label="Economy"onChange={handleChange} />
                      

                    </RadioGroup>
                </FormControl> }
                <br />


                <l>Adult (16+)</l><Button variant="contained" color="primary" display="flex" marginright onClick={IncCounterAdult}>+</Button> {counterAdult} <Button variant="contained" color="primary" display="flex" marginright onClick={DecCounterAdult}>-</Button>
                <br />
                <br />
                <l>Children (2-15)</l><Button variant="contained" color="primary" display="flex" marginright onClick={IncCounterChildren}>+</Button> {counterChildren} <Button variant="contained" color="primary" display="flex" marginright onClick={DecCounterChildren}>-</Button>
                <br />
                <br />


                <Button variant="contained" color="primary" display="flex" marginright onClick={ShowFlights}>Show Flights</Button>


                <div>


                </div>

            </Paper>
        </div>

    );

}