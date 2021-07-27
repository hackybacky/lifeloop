import React from 'react'
import { useState ,useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect, useHistory} from "react-router";
toast.configure()



export const Createpost = () => {
        
    const [title, settitle] = useState("")
    const [body, setbody] = useState("")
    const [image, setimage] = useState("")
    
    const [url, seturl] = useState("")
    const history=useHistory()
    const postdetails=()=>{
                const data= new FormData()
                data.append("file",image)
                data.append("upload_preset","hareeshsite")
                data.append("cloud_name","hareeshcloud")
                fetch("https://api.cloudinary.com/v1_1/hareeshcloud/image/upload",{
                    method:"post",
                    body:data
                }).then(res=>res.json())
                .then(data=>{
                    seturl(data.url)
                    
                })
                .catch(err=>{console.log(err);})
                
                fetch("/createpost",{
                    method:"post",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    },
                    body:JSON.stringify({
                        title:title,
                        body:body,
                        photo:url
                    })}
                ).then(res=>res.json())
                .then(data=>{
                        if(data.error)toast(data.error)
                        if(data.t){ toast("post created successfully")
                        history.push('/')
                }
                    
                })
              
                .catch(err=>{console.log(err)})

               
    }

    return (
        <div>
            
            <div className="card mx-auto border-primary " style={{width:"80%",margin:"5%",padding:"3%"}} >
                
                 <label for="name" class="control-label">Title</label>
                <input type="text"  class="form-control" id="name" placholder="Your title"
                    value={title}
                    onChange={
                        (e)=>{
                            settitle(e.target.value)
                        }
                    }
                />
                <label for="name" class="control-label"><h5>Write Something</h5></label>
                     <div class="input-group">
                                   
                    <div class="input-group-prepend">
                   
                    </div>
                    <textarea class="form-control" aria-label="With textarea"
                    value={body}
                    onChange={
                        (e)=>{
                            console.log(e.target.value)
                            setbody(e.target.value)
                        }
                    }
                    ></textarea>
                    </div>

                    <div class="custom-file">
                    <label class="custom-file-label" for="inputGroupFile01">Photo</label>
                    <br></br>
    <input type="file" class="custom-file-input" id="inputGroupFile01"
        onChange={
            (e)=>{
               
                setimage(e.target.files[0])
            }
        }
    />
   
  </div>

        <button type="button" class="btn btn-outline-primary btn-sm " style={{margin:"4%"}}
        onClick={postdetails}
        >Upload</button>
                </div>

        </div>
    )
}
