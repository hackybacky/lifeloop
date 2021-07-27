import React from 'react'
import { useState ,useEffect,useContext} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect, useHistory} from "react-router";
import { UserContext } from '../../App';
import { data } from 'jquery';
toast.configure()

export const Signin= () => {

   const {state,dispatch}=useContext(UserContext)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const history=useHistory()
   

    function Postdata(){
       
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          return toast("enter valid email");
        }
        axios.post("/signin",{
        
            email:email,
            password:password,
        }).then((res) => {
           
            if(!res.data.error){
              localStorage.setItem("jwt",res.data.token)
              localStorage.setItem("user",JSON.stringify(res.data.user))
              dispatch({type :"USER",payload:data.user})
                toast("signin successful");
                
                history.push("/");
              }
              else toast(res.data.error)
             
        }, (error) => {
          console.log(error);
        });

    }

    return (
        <div className=" container-fluid loginc card border-primary" style={{height:"50%"}}>
    
    <form  >    
    <div class="form-group">
  <h2 class="card-title text-center">signin</h2>
   
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

  
  <button 
  onClick={
    Postdata
  }
   type="button">Send</button>

</form>



</div>
    )
}
