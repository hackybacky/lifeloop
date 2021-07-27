const express=require("express");
const mongoose=require("mongoose");
const Post =mongoose.model("Post");
const router=express();
const requirelogin=require("../middleware/requirelogin");

router.get('/allposts',function(req,res){
    Post.find()
    .populate("postedby","_id name")
    .then(function(posts){
        res.json(posts);
    })
})


router.post('/createpost',requirelogin,function(req,res){

    const {title,body,photo}= req.body;
    
    if(!title || !body){
        return res.status(401).json({error:"post should have title and body"});
    }
    req.user.password="";
    const post=new Post ({
        title,
        body,
        photo,
        postedby:req.user
    })
    console.log(req.user);
    
    post.save();
    return res.json({t:"posted created successfully"});

})

router.get('/myposts',requirelogin,function(req,res){

    Post.find({postedby:req.user._id})
    .populate("postedby","_id name")
    .then(function(myposts){
        console.log(JSON.stringify(myposts.name));
        res.json(myposts);
        
    })
})

module.exports=router;