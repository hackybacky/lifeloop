

import React, { useState,useEffect } from 'react'

export const Home = () => {

    const  [Data, setData] = useState([])

    useEffect(() => {
       
       
                    fetch('/allposts',{
                        headers:{
                            "Authorization":"Bearer "+localStorage.getItem("user")
                        }
                    }).then(res=>res.json())
                    .then(result=>{
                        setData(result)
                        console.log(result)
                    })
       
       
     } )
    
    return (
      
        <div className="container-fluid">

    {
            Data.map(item=>{
                    console.log(item);
                    return(
          <div className="card mx-auto border-primary" style={{width:"70%",heigth:"40%",marginTop:"2%",padding:"2%"}}>
            <h5>{item.postedby.name}</h5>
            <h5 class="card-title">{item.title}</h5>
                     
                <img    style={{width:"100%",height:"50%"}}
                                src={item.photo}
                            />
                        
                      

                <p >{item.body}</p>
                <div class="card-body">

                    <input type="text" className="no-border" placeholder="comments"></input>
                </div>
                </div>
                    )
                
            })
        }

            
            
               
                
        </div>
    )
}
