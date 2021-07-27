const express=require("express");
const mongoose=require("mongoose");
const app=express();
const {MONGOURI}=require("./valuekeys.js");

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 

});
mongoose.connection.on('connected',function(){
    console.log("connected to DB");
})
mongoose.connection.on('error',function(){
    console.log("not connected to DB");
})

require("./models/user.js");
require("./models/post.js");
app.use(express.json());
app.use(require("./routes/authen"));
app.use(require("./routes/post"));

app.listen(8000,function(){
    console.log("happy coding!!!");
})
