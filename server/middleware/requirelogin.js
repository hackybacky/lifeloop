const express=require("express");
const mongoose=require("mongoose");
const User=mongoose.model("User");
const router=express();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {jwtkey}=require("../valuekeys");


module.exports=function(req,res,next){

    const {authorization}=req.headers;

    if(!authorization){
        res.status(401).json({error:"you are not logged in yet"});
    }
  
    const token=authorization.replace("Bearer ","")

    jwt.verify(token,jwtkey,function(err,payload){

        if(err){
            res.status(401).json({error:"your are not logged in "});
        }
        const {_id}=payload;
        User.findById(_id).then(function(userdata){

            req.user=userdata;
           next();
        })
  
    })

}