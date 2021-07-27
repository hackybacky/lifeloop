import React from 'react'
import { useState ,useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect, useHistory} from "react-router";
toast.configure()

export const Signup = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const history=useHistory()
   

    function Postdata(){
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          return toast("enter valid email");
        }
        axios.post("/signup",{
            name:name,
            email:email,
            password:password,
        }).then((res) => {
                if(!res.data.error){
                  toast("signup successful");
                  history.push("/signin");
                }
                else toast(res.data.error)
        }, (error) => {
          console.log(error);
        });

    }


    return (
       <div className=" container-fluid loginc card border-primary" style={{height:"50%"}}>
        <form  >    <div class="form-group">
  <h2 class="card-title text-center">signup</h2>
    <label for="exampleInputName">Your Name</label>
    <br></br>
    <input type="text"placeholder=" enter your name" class="form-control"
        value={name}
        onChange={
          function(e){
            setname(e.target.value)
          }
        }
     />
    <label for="exampleInputEmail1">Email</label>
    <br></br>
    <input type="text" placeholder="your email" class="form-control"
      value={email}
      onChange={
        function(e){
          setemail(e.target.value)
        }
      }
    />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <br></br>
    <input type="text"  placeholder="Enter Password" class="form-control"
      value={password}
      onChange={
        function(e){
          setpassword(e.target.value)
        }
      }

    />
  </div>

      <Link to="/signup">
  <button 
  onClick={
    Postdata
  }
   type="button">Send</button></Link>

</form>


  

       </div>
    )
}
