import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';

import axios from 'axios';
import Link from '@material-ui/core/Link';




export default function Login() {

 

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    

    const submitHandler = (e) => {
        e.preventDefault();
        const farah="Email="+email+"&Password="+password;
        axios.get('http://localhost:8000/users/v/Login?'+farah).then((response) => {
    
        if(response.data.length==0)
        {
            alert("User Not Found! Please Enter A Valid Email Or Password");
        }
        else
        {  
            const type =response.data.Type;
            if(type==="Admin")
            {
                window.location.href="/adminHome";
            } 
            else
            {
             const userId=response.data[0]._id;
             localStorage.setItem("userId",userId);
             if(localStorage.getItem("searchlinkreturn")===null)
             {
             window.location.href="/bookings/"+userId;
             }
             else
             {
                window.location.href="/confirm";
             }
            }

    
        } 

        });



       

 

}

       






    return (

            <form>

                <div>

                    <h2>Login</h2>

                    <div>

                        <label>Email</label>

                        <input type="email" placeholder="email" id="emailBox" onChange={e => setEmail(e.target.value)} />

 

                    </div>

 

                    <div>

                        <label>Password</label>

                        <input type="password" placeholder="passwordBox" id="passwordBox1" onChange={e => setPassword(e.target.value)} />

                    </div>

 

                    <br />

 

                    <Button variant="contained" color="primary" display="flex" marginright onClick={submitHandler}>Login</Button>

                   

                </div>
                <br/>
                <Link href="/search-available" variant="body2">
                {"Continue As A Guest"}
              </Link>

            </form>
          

        );

   

    }

 