const mongoose =require("mongoose");
const {objectid}=mongoose.Schema.Types;

const postschema=new mongoose.Schema({

    title:{
        type:String,
        required:false

    }
    ,
    body:{
        type:String,
        required : true
    },
    photo:{
        type:String,
        required:false
    }
    ,
    postedby:{
        type:{objectid},
        ref:"User"
    }

})

module.exports=mongoose.model("Post",postschema);