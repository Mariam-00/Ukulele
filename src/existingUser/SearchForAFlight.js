import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper,Button} from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import axios from 'axios';
import Grid from '@material-ui/core/Grid';

export default function SearchForFlight() {
  
  const [depDate,setDepDate]=useState();
  const[value,setValue]=useState();
 
  
 const handleChange =(e)=>
 {
    if(e.target.value==="Business")
    {
      localStorage.setItem("economy",0);
      localStorage.setItem("business",1);
      localStorage.setItem("class","Business")
      setValue("Business");
    }
    else{
        localStorage.setItem("economy",1);
        localStorage.setItem("business",0);
        localStorage.setItem("class","Economy");
        setValue("Economy");
    }
 }
 const handleSubmit =async e=>{
    e.preventDefault();
    let searchlink = "";
    localStorage.setItem("oneWay",1);
    searchlink+="DepartureDate="+depDate;
    
    window.location.href="/list-dep/"+searchlink;

    
}

 
    return(
      <div>
<h2>Search For Flight</h2>;
<TextField
  id="depDate"
  label="Departure Date"
  //value={this.state.flightNumber}
  onChange={e => setDepDate(e.target.value)}
  margin="normal"
/>
<br/>
{ <FormControl component="fieldset">
                    <FormLabel component="Class"></FormLabel>
                    <RadioGroup
                        aria-label="Class"
                        name="controlled-radio-buttons-group"
                        value={value}
                        
                    >
                        <FormControlLabel value="Business" control={<Radio />} label="Business" onChange={handleChange}/>
                        <FormControlLabel value="Economy" control={<Radio />} label="Economy"onChange={handleChange} />
                      

                    </RadioGroup>
                </FormControl> }





<br/>

 <div>
 <Button  variant="contained" color="primary" display = "flex"   marginright onClick={handleSubmit}>Search</Button>
      </div>
  <br/>

 </div>
);
    
 
}
