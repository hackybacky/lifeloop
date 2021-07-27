const express=require("express");
const mongoose=require("mongoose");
const User=mongoose.model("User");
const router=express();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {jwtkey}=require("../valuekeys");
const requirelogin=require("../middleware/requirelogin");
router.get('/',function(req,res){

        res.send("hello");
    })

    

    router.post("/signup",function(req,res){
        console.log(req.body);
        var name=req.body.name;
        var password=req.body.password;
        var email=req.body.email;
         if(!name  || !email || !password){
            return  res.status(201).json({error:"please fill all the details"});
         }
     
         User.findOne({email:email}).then(function(Saveduser){
             if(Saveduser){
                 return  res.status(201).json({error:"User already exists"});
             }
             bcrypt.hash(password,12).then(function(hashpassword){

                const user=new User({
                    name,
                    password:hashpassword,
                    email
                })
               user.save().then(()=> res.send("user save succesfully"));
             })
             
         })
    })

    router.get("/protected",requirelogin,function(req,res){
        res.send("hello protected");
    })

    router.post('/signin',function(req,res){

                const {email,password}=req.body;
         
                User.findOne({email:email}).then(function(saveduser){
                    
                    if(!saveduser)return  res.status(201).json({error:"please signup first"});
                    bcrypt.compare(password,saveduser.password).then(function(match){
                        if(match){
                            const token=jwt.sign({_id:saveduser._id},jwtkey);
                            const {_id,name,email}=saveduser;
                            
                         res.json({token,user:{_id,name,email}});
                        }
                        else  return  res.status(201).json({error:"Invalid username or password"});
                    })

                })
    })




   module.exports=router;